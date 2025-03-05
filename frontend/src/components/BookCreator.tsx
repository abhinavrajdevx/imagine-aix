import React, { useState, useEffect } from 'react';
import { Book, Genre, Page } from '../types';
import { Save, X, Plus, Trash2, BookOpen, Image, RefreshCw } from 'lucide-react';
import PageEditor from './PageEditor';

interface BookCreatorProps {
  initialBook: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const genres: Genre[] = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Adventure",
  "Horror",
  "Children's",
  "Non-fiction",
  "Poetry",
  "Other"
];

const BookCreator: React.FC<BookCreatorProps> = ({ initialBook, onSave, onCancel }) => {
  const [book, setBook] = useState<Book>(() => {
    if (initialBook) return { ...initialBook };
    
    return {
      id: crypto.randomUUID(),
      title: '',
      author: '',
      genre: 'Fantasy',
      description: '',
      coverPrompt: '',
      coverUrl: '',
      pages: [
        {
          id: crypto.randomUUID(),
          content: '',
          imagePrompt: '',
          imageUrl: ''
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addNewPage = () => {
    const newPage: Page = {
      id: crypto.randomUUID(),
      content: '',
      imagePrompt: '',
      imageUrl: ''
    };
    
    setBook(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    
    // Switch to the new page
    setCurrentPageIndex(book.pages.length);
  };

  const updatePage = (updatedPage: Page) => {
    setBook(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === updatedPage.id ? updatedPage : page
      )
    }));
  };

  const deletePage = (pageId: string) => {
    if (book.pages.length <= 1) {
      alert("A book must have at least one page.");
      return;
    }
    
    setBook(prev => {
      const newPages = prev.pages.filter(page => page.id !== pageId);
      return {
        ...prev,
        pages: newPages
      };
    });
    
    // Adjust current page index if needed
    if (currentPageIndex >= book.pages.length - 1) {
      setCurrentPageIndex(book.pages.length - 2);
    }
  };

  const generateBookContent = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const demoBook: Book = {
        ...book,
        title: book.title || "The Mysterious Journey",
        description: book.description || "An adventure through unknown lands, where magic and science intertwine.",
        pages: book.pages.map((page, index) => ({
          ...page,
          content: page.content || `This is page ${index + 1} of the book. Here's where the story unfolds with interesting characters and plot twists.`,
          imagePrompt: page.imagePrompt || `A beautiful illustration for page ${index + 1}`,
          imageUrl: `https://source.unsplash.com/random/800x600?book,story,${index}`
        })),
        coverUrl: book.coverUrl || "https://source.unsplash.com/random/800x1200?book,cover",
        updatedAt: Date.now()
      };
      
      setBook(demoBook);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!book.title.trim()) {
      alert("Please enter a title for your book.");
      return;
    }
    
    if (!book.author.trim()) {
      alert("Please enter an author name.");
      return;
    }
    
    onSave({
      ...book,
      updatedAt: Date.now()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialBook ? 'Edit Book' : 'Create New Book'}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isGenerating}
          >
            <Save className="h-5 w-5" />
            <span>Save Book</span>
          </button>
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            disabled={isGenerating}
          >
            <X className="h-5 w-5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter author name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter book description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="coverPrompt" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image Prompt
            </label>
            <input
              type="text"
              id="coverPrompt"
              name="coverPrompt"
              value={book.coverPrompt || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the cover image you want"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Pages</h3>
          <button
            onClick={generateBookContent}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>

        <div className="flex mb-4 overflow-x-auto pb-2">
          {book.pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg ${
                currentPageIndex === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Page {index + 1}
            </button>
          ))}
          <button
            onClick={addNewPage}
            className="flex items-center space-x-1 flex-shrink-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Page</span>
          </button>
        </div>

        {book.pages.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">Page {currentPageIndex + 1}</h4>
              <button
                onClick={() => deletePage(book.pages[currentPageIndex].id)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                disabled={book.pages.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Page</span>
              </button>
            </div>
            <PageEditor 
              page={book.pages[currentPageIndex]} 
              onUpdate={updatePage} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCreator;