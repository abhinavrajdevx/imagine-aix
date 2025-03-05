import { useLocation } from "react-router-dom";
import { Book } from "../types";
import { useState } from "react";
import {
  BookOpen,
  Plus,
  Save,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  BookText,
} from "lucide-react";

import BookCreator from "../components/BookCreator";
const Bookpage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookText className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Book Maker AI</h1>
          </div>
          <button
            onClick={handleCreateBook}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Book</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isCreating ? (
          <BookCreator
            initialBook={currentBook}
            onSave={handleSaveBook}
            onCancel={() => {
              setIsCreating(false);
              setCurrentBook(null);
            }}
          />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Books
            </h2>
            {books.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">
                  You haven't created any books yet.
                </p>
                <button
                  onClick={handleCreateBook}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create Your First Book
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-40 flex items-center justify-center cursor-pointer"
                      onClick={() => toggleExpand(book.id)}
                    >
                      <h3 className="text-xl font-bold text-white text-center px-4">
                        {book.title}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            {book.pages.length} pages
                          </p>
                          <p className="text-sm text-gray-600">
                            Genre: {book.genre}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditBook(book)}
                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                          >
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => toggleExpand(book.id)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            {expandedBookId === book.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookpage;
