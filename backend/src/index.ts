import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import { generateIndex } from "./ai agents/generateIndex";
import { generateChapter } from "./ai agents/generateChapter";
import makeid from "./utils/makeId";
import { generateBookTitleDescription } from "./ai agents/generateBookTitleDescription";
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

let books: string | any[] = [];

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/book/:id", (req: any, res: any) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == req.params.id) {
      res.send(books[i]);
    }
  }
});

app.get("/id/all", (req: any, res: any) => {
  res.status(200).json({ message: "OK", books });
});

app.post("/generate", async (req: any, res: any) => {
  const id = makeid(256);

  try {
    res.status(200).json({
      message: "OK",
      id,
    });

    const json_data: { user_prompt: string } = req.body;
    const { chapters } = await generateIndex(json_data.user_prompt, groq);
    const book: any = [];

    books.push({
      id,
      book,
      title: "",
      description: "",
      generated: false,
      error: false,
    });

    console.log("Total chapters", chapters.length);

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

    const book_about = await generateBookTitleDescription(
      JSON.stringify(chapters),
      groq
    );

    console.log("book_about");
    console.log(book_about);

    for (let i = 0; i < books.length; i++) {
      if (books[i].id == id) {
        books[i] = {
          id,
          book,
          title: book_about.book_title,
          description: book_about.book_description,
          generated: true,
          error: false,
        };
      }
    }
    console.log("done...", id);
  } catch (e) {
    try {
      res.status(200).json({
        message: "ERROR",
      });
    } catch (e) {}
    for (let i = 0; i < books.length; i++) {
      if (books[i].id == req.params.id) {
        books[i] = {
          id,
          book: [],
          generated: false,
          error: true,
        };
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`App running at ${PORT}`);
});
