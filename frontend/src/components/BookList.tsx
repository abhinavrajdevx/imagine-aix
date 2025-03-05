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
      <div className="p-12 text-center">
        <Brain size={48} className="mx-auto text-library-300 mb-4" />
        <p className="text-library-500 text-lg">
          No AI generated contents found in your Imagine library.
        </p>
        <p className="text-library-400 mt-2">
          Create a new content on homepage to create your Imagine library.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-library-200">
        <thead className="bg-library-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-serif font-medium text-library-700 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-serif font-medium text-library-700 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-serif font-medium text-library-700 uppercase tracking-wider"
            >
              Chapters
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-serif font-medium text-library-700 uppercase tracking-wider"
            >
              Actions
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-serif font-medium text-library-700 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-library-100">
          {books.map((book: any) => (
            <tr
              key={book.id}
              className="hover:bg-library-50 transition-colors book-spine"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-library-600 font-mono">
                {book.id.slice(0, 9) + "..."}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-library-800">
                  {book.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-library-600">
                {book.book.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onPreview(book)}
                    className="text-library-500 hover:text-library-700 transition-colors"
                    aria-label="Preview model"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(book)}
                    className="text-library-600 hover:text-library-800 transition-colors"
                    aria-label="Edit model"
                  >
                    <Edit size={18} />
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
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Delete model"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-library-600">
                {book.error
                  ? "Error"
                  : book.generated
                  ? "Success"
                  : "processing..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
