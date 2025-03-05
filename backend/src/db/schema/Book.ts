import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: { type: Array, default: [] },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  generated: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Create Models

export const Book = mongoose.model("Book", BookSchema);
