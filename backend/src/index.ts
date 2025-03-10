import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./db/schema/Book";
import { User } from "./db/schema/User";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookgenerator";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`App running at ${PORT}`);
});

app.use("/imagine-aix/api/user", userRoutes);
app.use("/imagine-aix/api/book", bookRoutes);

// Export models for potential use in other files
export { User, Book };
