import bcrypt from "bcryptjs";
import { Router } from "express";
import { User } from "../db/schema/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const router = Router();

router.post("/signup", async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        message: "User registered successfully",
        token,
        userId: user._id,
        username: user.username,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        userId: user._id,
        username: user.username,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
