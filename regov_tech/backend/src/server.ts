import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from './model/user.model'
import { ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = 8888;

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

//Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.use(cors());
app.use(express.json());

//Test to see if server works
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express.js!");
});

//Register user
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    //Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "Username already exist" });

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: "User not found" });

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    //Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET!);

    res.json({ message: 'Login successful', token})
  } catch (error) {
    console.error("Failed to login:", error);
    res.sendStatus(500).json({ message: "Internal server error" });
  }
});


interface CustomRequest extends Request {
  userId: string
}

// Search user by username
app.get("/user", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authorization token not provided'})

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET!)
    const userId: ObjectId = new ObjectId(decoded.userId)

    const user: any | null = await User.findById(userId)

    if(!user) return res.status(404).json({ message: 'User not found'})

    res.json(user)
  } catch (error) {
    return res.status(401).json({ message: 'User not found'})
  }

});

//Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
