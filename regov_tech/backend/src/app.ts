import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = 8888;

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error('MONGODB_URI environment variable is not defined')
}

//Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

//Create user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

//Create user model
const User = mongoose.model("User", userSchema);

app.use(express.json());

//Register user
app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    //Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exist" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.sendStatus(201);
  } catch (error) {
    console.log("Failed to register user", error);
    return res.sendStatus(500);
  }
});

//User login
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    //Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (user.password) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

    return res.sendStatus(200);
  } catch (error) {
    console.log("Failed to login", error);
    return res.sendStatus(500);
  }
});
