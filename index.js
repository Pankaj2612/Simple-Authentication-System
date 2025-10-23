import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = "s23h2h3";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
app.get("/", async (req, res) => {
  res.send("API is running...");
});

// Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exists Go to Login" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: passwordHash });
    await user.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login User
app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid email or password." });

    //JWT Token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.listen(8000, () => {
  console.log("Server running");
});

export default app;
