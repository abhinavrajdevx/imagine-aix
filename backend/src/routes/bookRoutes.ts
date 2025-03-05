import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { Book } from "../db/schema/Book";
import makeid from "../utils/makeId";
import { generateIndex } from "../ai agents/generateIndex";
import { generateChapter } from "../ai agents/generateChapter";
import { generateBookTitleDescription } from "../ai agents/generateBookTitleDescription";
import Groq from "groq-sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const router = Router();

router.post("/id/:id", authMiddleware, async (req: any, res: any) => {
  try {
    const book = await Book.findOne({
      id: req.params.id,
      userId: req.user.user.id,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/all", authMiddleware, async (req: any, res: any) => {
  try {
    const books = await Book.find({ userId: req.user.user.id });
    res.status(200).json({ message: "OK", books });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/generate", authMiddleware, async (req: any, res: any) => {
  const id = makeid(256);

  try {
    // Immediately send response with ID
    res.status(200).json({
      message: "OK",
      id,
    });

    const json_data: { user_prompt: string } = req.body;
    const { chapters } = await generateIndex(json_data.user_prompt, groq);
    const book: any = [];

    // Create initial book document with user ID
    const newBook = new Book({
      id,
      userId: req.user.user.id,
      book: [],
      title: "",
      description: "",
      generated: false,
      error: false,
    });
    await newBook.save();

    console.log("Total chapters", chapters.length);

    // Generate chapters
    for (let i = 0; i < chapters.length; i++) {
      const contents_chapter = await generateChapter(
        json_data.user_prompt,
        chapters[i].title,
        chapters[i].description,
        JSON.stringify(chapters),
        groq
      );
      book.push(contents_chapter);

      console.log(i);
    }

    // Generate book title and description
    const book_about = await generateBookTitleDescription(
      JSON.stringify(chapters),
      groq
    );

    // Update book document
    await Book.findOneAndUpdate(
      { id, userId: req.user.user.id },
      {
        book,
        title: book_about.book_title,
        description: book_about.book_description,
        generated: true,
        error: false,
      }
    );

    console.log("done...", id);
  } catch (e) {
    console.error("Book generation error:", e);

    // Update book document with error status
    await Book.findOneAndUpdate(
      { id, userId: req.user.user.id },
      {
        book: [],
        generated: false,
        error: true,
      }
    );
  }
});

export default router;
