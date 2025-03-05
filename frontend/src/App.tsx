import { useState } from "react";

import { Book } from "./types";
import Prompt from "./components/Prompt";
import Header from "./components/Header";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const [book_prompt, set_book_prompt] = useState("");

  const handleCreateBook = () => {
    setIsCreating(true);
    setCurrentBook(null);
  };

  const handleSaveBook = (book: Book) => {
    if (currentBook) {
      // Update existing book
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
    } else {
      // Add new book
      setBooks([...books, book]);
    }
    setIsCreating(false);
    setCurrentBook(null);
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setIsCreating(true);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    if (currentBook?.id === id) {
      setCurrentBook(null);
      setIsCreating(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  return (
    <div className="inset-0 w-screen h-screen flex  flex-col ">
      <Header />
      <div className="flex w-screnn flex-grow items-center justify-center">
        <Prompt book_prompt={book_prompt} set_book_prompt={set_book_prompt} />
      </div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-green-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-60 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"></div>
    </div>
  );
}

export default App;
