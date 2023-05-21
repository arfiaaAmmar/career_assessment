"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const port = 8888;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
}
//Connect to MongoDB
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
//Create user schema
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
});
//Create user model
const User = mongoose_1.default.model("User", userSchema);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Test to see if server works
app.get("/", (req, res) => {
    res.send("Hello, Express.js!");
});
//Register user
app.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        //Check if email or password contain spaces
        if (email.includes(" ") ||
            username.includes(" ") ||
            password.includes(" ")) {
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        //Create new user
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log("Failed to register user", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// User login
app.post("/login", async (req, res) => {
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
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Failed to login:", error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
});
app.get("/user/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Failed to find user:", error);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
});
//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


module.exports.handler = async (event) => {
    // Extract the HTTP method and path from the event object
    const { httpMethod, path } = event;
  
    // Create a request object to pass to Express.js
    const req = {
      method: httpMethod,
      url: path,
      headers: event.headers,
      query: event.queryStringParameters,
      body: JSON.parse(event.body),
    };
  
    // Create a response object to collect the response from Express.js
    let response = { statusCode: 404, body: 'Not Found' };
  
    // Run the Express.js app
    await app(req, response);
  
    // Return the response from Express.js
    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body),
      headers: response.headers,
    };
  };