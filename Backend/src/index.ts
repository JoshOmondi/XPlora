import express, { Request, Response } from "express";
import { TestConnection } from "./config/sqlConfig";
import dotenv from "dotenv";
import cors from "cors";
import user_router from "./routes/UserRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3500;

mongoose.connect("mongodb://localhost:27017/TOUR", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());
app.use(cors());

// Move these lines below bodyParser and cors setup
app.use("/user", user_router);

// Register endpoint
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    // Assuming the registration form sends username, email, and password
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Remove the duplicated app.listen
// TestConnection(); // Uncomment if this is a function you want to call at startup
