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

export const BookPreview = ({ book, onClose }: { book: any; onClose: any }) => {
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

  const getChaptername = (content: string) => {
    // Split the content by newlines and filter out empty lines
    const lines = content.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      // Check if the line is a chapter title
      if (line.startsWith("Chapter")) {
        return line;
      }
    });
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl overflow-hidden"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        className={`${getModelColor()} p-6 text-white backdrop-blur-sm bg-opacity-80 border-b border-white/10`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif font-bold flex items-center">
            <span className="bg-white/10 p-1 rounded mr-2">
              <Brain size={24} className="text-white" />
            </span>
            imagine preview
          </h3>
          <button
            onClick={onClose}
            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close preview"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200">
        <div className="flex flex-col md:flex-row gap-8">
          <div
            className={`${getModelColor()} w-full md:w-48 h-72 rounded-lg shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10"></div>

            {/* Animated network effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff_0,_transparent_70%)] animate-pulse"></div>

            <Brain
              size={64}
              className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="mt-4 text-white text-center font-serif relative z-10 px-4">
              <div className="text-sm font-light tracking-wider opacity-80">
                Model
              </div>
              <div className="text-xl font-bold mt-1">{book.title}</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="p-1 rounded bg-library-800/50 mr-2">
                  <Cpu size={16} className="text-library-400" />
                </div>
                <h4 className="text-sm font-medium text-library-400">
                  Book name
                </h4>
              </div>
              <p className="text-2xl font-serif font-semibold text-white pl-7">
                {book.title}
              </p>
            </div>

            <div className="border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="p-1 rounded bg-library-800/50 mr-2">
                  <Network size={16} className="text-library-400" />
                </div>
                <h4 className="text-sm font-medium text-library-400">
                  Total chapters
                </h4>
              </div>
              <p className="text-xl text-white pl-7">{book.book.length}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <div className="p-1 rounded bg-library-800/50 mr-2">
                  <BookText size={16} className="text-library-400" />
                </div>
                <h4 className="text-sm font-medium text-library-400">
                  Book contents
                </h4>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg max-h-48 overflow-y-auto border border-gray-700 backdrop-blur-sm shadow-inner">
                <ul className="space-y-1">
                  {chapterContents.length > 0 &&
                    chapterContents.map((_item: any) => (
                      <li
                        key={0}
                        className={`text-sm flex items-center p-2 rounded-md transition-colors duration-200 ${
                          activeChapter === 999999999
                            ? "bg-library-700/60 text-white border-l-2 border-library-400"
                            : "text-gray-300 hover:bg-library-800/60"
                        }`}
                      >
                        <span
                          className={`w-8 font-mono ${
                            activeChapter === 999999999
                              ? "text-library-300"
                              : "text-library-500"
                          }`}
                        ></span>
                        <span>{getChaptername(_item.chapter_contents)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex items-center mb-4">
            <div className="p-1 rounded bg-library-800/50 mr-2">
              <FileText size={16} className="text-library-400" />
            </div>
            <h4 className="text-gray-300 italic">{book.description}</h4>
          </div>

          <div className="bg-gray-800/30 p-5 rounded-lg min-h-[300px] max-h-[500px] overflow-y-auto border border-gray-700 backdrop-blur-sm shadow-inner">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <LoadingSpinner size="medium" />
                  <p className="mt-4 text-library-400">
                    Loading module content...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 p-8 bg-red-900/20 rounded-lg border border-red-800/50">
                <p>{error}</p>
              </div>
            ) : chapterContents.length > 0 ? (
              <div className="flex flex-col gap-6">
                {chapterContents.map((_item: any) => (
                  <div className="prose max-w-none text-gray-200 bg-gray-800/50 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors shadow-lg">
                    {formatChapterContent(_item.chapter_contents)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 p-8 bg-gray-800/50 rounded-lg border border-gray-700">
                <p>No content available for this module.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
