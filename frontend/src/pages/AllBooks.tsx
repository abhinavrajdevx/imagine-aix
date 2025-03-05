import React, { useState, useEffect } from "react";
import { BookList } from "../components/BookList";
import { Book } from "../types";
import { BookPreview } from "../components/BookPreview";
import { Brain, Search, PlusCircle, Database } from "lucide-react";
import { fetchBooks } from "../apis/fetchBooks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Header from "../components/Header";

function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks();
        console.log(data);
        setBooks(data.books);
        setError(null);
      } catch (err) {
        setError("Failed to load AI models. Please try again later.");
        console.error("Error loading books:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleAddBook = (book: Omit<Book, "id">) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
    };
    setBooks([...books, newBook]);
    setIsFormOpen(false);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
    setIsFormOpen(false);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    if (editingBook?.id === id) {
      setEditingBook(null);
      setIsFormOpen(false);
    }
    if (previewBook?.id === id) {
      setPreviewBook(null);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handlePreviewBook = (book: Book) => {
    setPreviewBook(book);
  };

  const closePreview = () => {
    setPreviewBook(null);
  };

  const filteredBooks = books.filter(
    (book: any) => book
    // console.log(book.book)
    // book.book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-library-50">
      <Header />

      <div className="book-shelf bg-cover bg-center py-16 px-4 relative">
        <div className="absolute inset-0 bg-black "></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            The Imagine Library
          </h2>
          <p className="text-library-100 max-w-2xl mx-auto mb-8 text-slate-200">
            Access all your AI generated contents at one place which is Imagine
            Library <br />
            Where sky is the limit and you are the pilot so make sure you fly
            high
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-full border-2 border-library-300 focus:outline-none focus:border-library-500 bg-white bg-opacity-90"
              />
              <Search
                className="absolute left-3 top-3.5 text-library-500"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 -mt-8 relative z-20">
        <div className="bg-white rounded-lg shadow-book p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif text-library-800">
              Manage library
            </h3>
            <button
              onClick={() => {
                setEditingBook(null);
                setIsFormOpen(true);
              }}
              className="bg-library-600 hover:bg-library-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Add New Model
            </button>
          </div>

          <div className="bg-white rounded-lg border border-library-100 overflow-hidden">
            {loading ? (
              <div className="p-16 text-center">
                <LoadingSpinner size="large" />
                <p className="mt-6 text-library-600 text-lg">
                  Loading AI models from the repository...
                </p>
              </div>
            ) : error ? (
              <div className="p-16 text-center">
                <Database size={48} className="mx-auto text-red-400 mb-4" />
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-library-600 text-white rounded-md hover:bg-library-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <BookList
                books={filteredBooks}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                onPreview={handlePreviewBook}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-library-800 text-library-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Imagine AiX.</p>
        </div>
      </footer>

      {previewBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-book-page rounded-lg shadow-book max-w-4xl w-full max-h-[90vh] overflow-auto">
            <BookPreview book={previewBook} onClose={closePreview} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
