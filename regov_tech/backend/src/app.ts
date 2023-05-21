import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 8888;

const MONGODB_URI = process.env.MONGODB_URI;

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

//Create user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
});

//Create user model
const User = mongoose.model("User", userSchema);

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

    //Check if email or password contain spaces
    if (
      email.includes(" ") ||
      username.includes(" ") ||
      password.includes(" ")
    ) {
      return res
        .status(400)
        .json({ message: "Email or password cannot contain spaces" });
    }

    //Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exist" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Failed to register user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    //Check if email or password contain spaces
    if (username.includes(" ") || password.includes(" ")) {
      return res
        .status(400)
        .json({ message: "Email or password cannot contain spaces" });
    }

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Failed to login:", error);
    res.sendStatus(500).json({ message: "Internal server error" });
  }
});

app.get("/user:username", async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to find user:", error);
    res.sendStatus(500).json({ error: "Internal server error" });
  }
});

//Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
