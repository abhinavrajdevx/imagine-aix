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

  return <Prompt book_prompt={book_prompt} set_book_prompt={set_book_prompt} />;
}

export default App;
