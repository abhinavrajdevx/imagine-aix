import React from 'react';
import { Page } from '../types';
import { Image } from 'lucide-react';

interface PageEditorProps {
  page: Page;
  onUpdate: (page: Page) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ page, onUpdate }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...page,
      [name]: value
    });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...page,
      imageUrl: e.target.value
    });
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor={`content-${page.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Page Content
        </label>
        <textarea
          id={`content-${page.id}`}
          name="content"
          value={page.content}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write the content for this page"
        />
      </div>

      <div className="mb-4">
        <label htmlFor={`imagePrompt-${page.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Image Prompt
        </label>
        <input
          type="text"
          id={`imagePrompt-${page.id}`}
          name="imagePrompt"
          value={page.imagePrompt || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe the image you want for this page"
        />
      </div>

      {page.imageUrl && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Image
          </label>
          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={page.imageUrl} 
              alt="Page illustration" 
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="text"
            value={page.imageUrl}
            onChange={handleImageUrlChange}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Image URL"
          />
        </div>
      )}

      {!page.imageUrl && page.imagePrompt && (
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg mb-4">
          <div className="text-center text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-2" />
            <p>Image will be generated from your prompt</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageEditor;