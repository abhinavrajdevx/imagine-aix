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

  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
      <Header />

      <div className="py-20 px-4 relative overflow-hidden">
        {/* Animated particle background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-indigo-500 opacity-10 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5">
              <div className="h-full w-full rounded-lg bg-black bg-opacity-30 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
            </div>
            <h2 className="text-5xl font-serif font-bold text-white ml-4 tracking-tight">
              Imagine{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
                Library
              </span>
            </h2>
          </div>

          <p className="text-indigo-200 max-w-2xl mx-auto mb-10 text-lg">
            Access all your AI generated content in one centralized hub.
            <br />
            <span className="text-purple-300 italic">
              Where imagination meets technology, and possibilities are endless.
            </span>
          </p>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-full border border-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200"
              />
              <Search
                className="absolute left-4 top-4 text-indigo-300"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-2xl font-serif text-white">
                <span className="inline-block w-2 h-8 bg-purple-500 rounded-full mr-3 align-middle"></span>
                All Contents
              </h3>
              <div className="ml-4 px-3 py-1 rounded-full bg-indigo-900/50 text-xs text-indigo-200 border border-indigo-500/30">
                {filteredBooks?.length || 0} Contents
              </div>
            </div>

            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Create
            </button>
          </div>

          <div className="bg-white/5 rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-16 text-center">
                <LoadingSpinner size="large" />
                <p className="mt-6 text-indigo-300 text-lg">
                  Connecting to neural network...
                </p>
              </div>
            ) : error ? (
              <div className="p-16 text-center">
                <Database size={48} className="mx-auto text-red-400 mb-4" />
                <p className="text-red-300 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-colors shadow-lg"
                >
                  Retry Connection
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

      {previewBook && (
        <div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-b from-indigo-900 to-purple-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-indigo-500/30">
            <BookPreview book={previewBook} onClose={closePreview} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
