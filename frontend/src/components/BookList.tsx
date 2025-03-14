import React from "react";
import { Book } from "../types";
import { Edit, Eye, Trash2, Brain } from "lucide-react";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onPreview: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
  onPreview,
}) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl  shadow-lg">
        <div className="relative mb-6">
          <Brain size={48} className="text-indigo-400 z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-400/10 rounded-full animate-pulse"></div>
        </div>

        <h3 className="text-gray-200 text-xl font-medium mb-3">No Content</h3>

        <p className="text-gray-400 text-lg mb-2">
          No AI generated contents found in your Imagine library.
        </p>

        <p className="text-gray-400 mt-2 mb-6">Create a new content now.</p>

        <div className="w-full max-w-xs h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-slate-900 to-purple-900">
      <table className="min-w-full ">
        <thead className="bg-gradient-to-r from-slate-800 to-purple-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-purple-100 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-purple-100 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-purple-100 uppercase tracking-wider"
            >
              Chapters
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-purple-100 uppercase tracking-wider"
            >
              Actions
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-purple-100 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {books.map((book: any) => (
            <tr
              key={book.id}
              className="hover:bg-slate-800/50 transition-colors duration-200 ease-in-out book-spine group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-black/40 text-emerald-400 py-1 px-3 rounded-md font-mono text-xs border border-emerald-500/30 backdrop-blur-sm">
                  {book.id.slice(0, 9) + "..."}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-100 group-hover:text-white transition-colors">
                  {book.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-purple-900/60 text-purple-100 py-1 px-3 rounded-full text-xs font-medium inline-flex items-center border border-purple-400/30 backdrop-blur-sm">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </span>
                  {book.book.length}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onPreview(book)}
                    className="bg-blue-900/50 p-2 rounded-full text-blue-300 hover:bg-blue-700 hover:text-blue-100 transition-colors border border-blue-500/30 backdrop-blur-sm"
                    aria-label="Preview Book"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(book)}
                    className="bg-purple-900/50 p-2 rounded-full text-purple-300 hover:bg-purple-700 hover:text-purple-100 transition-colors border border-purple-500/30 backdrop-blur-sm"
                    aria-label="Edit book"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to remove "${book.name}" from the repository?`
                        )
                      ) {
                        onDelete(book.id);
                      }
                    }}
                    className="bg-red-900/50 p-2 rounded-full text-red-300 hover:bg-red-700 hover:text-red-100 transition-colors border border-red-500/30 backdrop-blur-sm"
                    aria-label="Delete Book"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {book.error ? (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-900/50 text-red-200 border border-red-500/30 backdrop-blur-sm">
                    <svg
                      className="w-3 h-3 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Error
                  </span>
                ) : book.generated ? (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-900/50 text-green-200 border border-green-500/30 backdrop-blur-sm items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Success
                  </span>
                ) : (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-900/50 text-yellow-200 border border-yellow-500/30 backdrop-blur-sm items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-3 w-3 text-yellow-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    processing...
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
