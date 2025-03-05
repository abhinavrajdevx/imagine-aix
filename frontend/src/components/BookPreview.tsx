import React, { useState, useEffect } from "react";
import { Book } from "../types";
import {
  X,
  Brain,
  Bookmark,
  BookText,
  Cpu,
  Network,
  FileText,
} from "lucide-react";
import { fetchBookContent } from "../apis/fetchBookContent";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface BookPreviewProps {
  book: Book;
  onClose: () => void;
}

export const BookPreview: React.FC<BookPreviewProps> = ({ book, onClose }) => {
  console.log("Book preview");
  console.log(book);
  const [chapterContents, setChapterContents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookContent = async () => {
      try {
        setLoading(true);
        const contents = await fetchBookContent(book.id);
        setChapterContents(contents.book);
        setError(null);
      } catch (err) {
        setError("Failed to load model content. Please try again later.");
        console.error("Error loading book content:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookContent();
  }, [book.id]);

  // Generate a consistent color for the model cover based on book id
  const getModelColor = () => {
    const colors = [
      "bg-cyan-700",
      "bg-indigo-800",
      "bg-violet-800",
      "bg-blue-800",
      "bg-purple-900",
      "bg-teal-800",
      "bg-sky-800",
      "bg-slate-800",
    ];
    // Use the book id to get a consistent color
    const colorIndex = parseInt(book.id) % colors.length;
    return colors[colorIndex];
  };

  const formatChapterContent = (content: string) => {
    // Split the content by newlines and filter out empty lines
    const lines = content.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      // Check if the line is a chapter title
      if (line.startsWith("Chapter")) {
        return (
          <h3 key={index} className="text-xl font-serif font-bold mt-6 mb-3">
            {line}
          </h3>
        );
      }
      return (
        <p key={index} className="mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="p-0">
      <div className={`${getModelColor()} p-6 text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif font-bold">Model Architecture</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-library-100 transition-colors"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div
            className={`${getModelColor()} w-full md:w-48 h-64 rounded-md shadow-book flex flex-col items-center justify-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-white bg-opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-black bg-opacity-20"></div>
            <Brain size={64} className="text-white relative z-10" />
            <div className="mt-4 text-white text-center font-serif relative z-10 px-4">
              <div className="text-sm opacity-80">Model</div>
              <div className="text-xl font-bold">{book.title}</div>
            </div>
          </div>

          <div className="flex-1 text-white">
            <div className="border-b border-library-100 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <Cpu size={18} className="text-library-600 mr-2" />
                <h4 className="text-sm font-medium text-library-500">
                  Book name
                </h4>
              </div>
              <p className="text-2xl font-serif font-semibold text-library-800">
                {book.title}
              </p>
            </div>

            <div className="border-b border-library-100 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <Network size={18} className="text-library-600 mr-2" />
                <h4 className="text-sm font-medium text-library-500">
                  Total chapters
                </h4>
              </div>
              <p className="text-xl text-library-800">{book.book.length}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <BookText size={18} className="text-library-600 mr-2" />
                <h4 className="text-sm font-medium text-library-500">
                  book contents
                </h4>
              </div>
              <div className="bg-library-50 p-4 rounded-md max-h-48 overflow-y-auto border border-library-100">
                <ul className="space-y-2">
                  {Array.from({ length: book.book.length }, (_, i) => (
                    <li
                      key={i}
                      className={`text-sm flex items-center p-1 rounded ${
                        activeChapter === i
                          ? "bg-library-200 text-library-800"
                          : "text-library-700 hover:bg-library-100"
                      }`}
                    >
                      <span className="w-8 font-mono text-library-500">
                        {i + 1}.
                      </span>
                      <span>Module {i + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-library-100 pt-6">
          <div className="flex items-center mb-4">
            <FileText size={18} className="text-library-600 mr-2" />
            <h4 className=" text-slate-300">{book.description}</h4>
          </div>

          <div className="bg-none p-5 rounded-md  min-h-[300px] max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <LoadingSpinner size="medium" />
                  <p className="mt-4 text-library-600">
                    Loading module content...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-8">
                <p>{error}</p>
              </div>
            ) : chapterContents.length > 0 ? (
              <div className="flex flex-col gap-9 bg-none">
                {chapterContents.map((_item) => (
                  <div className="prose max-w-none text-library-800 bg-white px-3 rounded-lg">
                    {formatChapterContent(_item.chapter_contents)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-library-500 p-8">
                <p>No content available for this module.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
