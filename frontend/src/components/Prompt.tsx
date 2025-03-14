import React, { useState } from "react";
import { generate } from "../apis/generate";
import Header from "./Header";

const Prompt = ({
  book_prompt,
  set_book_prompt,
}: {
  book_prompt: string;
  set_book_prompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, set_loading] = useState(false);

  const handleGenerateClick = async () => {
    const res = await generate(book_prompt);
    console.log("res", res.message);
    set_loading(true);
    if (res.message == "OK") {
      alert(
        `Book will is generating, It may take some time, check 'My library' section for the status. \n Book id : ${res.id}`
      );
    } else {
      alert("Unknown error");
    }
    set_loading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-[700px] mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            AI-Powered Content Generator
          </h1>
          <p className="text-blue-200 text-center mt-2">
            Create books, stories, and research papers with a single prompt
          </p>
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-8 w-16 h-16 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
        </div>

        <div className="backdrop-blur-sm bg-white/10 rounded-xl border border-gray-700 shadow-2xl w-full max-w-[600px] overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-blue-300 font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Creative prompt
              </span>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                <div className="h-2 w-2 rounded-full bg-pink-400"></div>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 mb-4 border border-gray-700">
              <textarea
                value={book_prompt}
                rows={4}
                onChange={(e) => set_book_prompt(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500 resize-none"
                placeholder="Describe your book, story, or research paper idea..."
              />
            </div>

            <div className="flex space-x-3 mb-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="book"
                  name="content-type"
                  className="hidden peer"
                  defaultChecked
                />
                <label
                  htmlFor="book"
                  className="cursor-pointer px-3 py-1 text-xs text-blue-300 peer-checked:bg-blue-900/30 peer-checked:text-blue-200 rounded-full border border-blue-800"
                >
                  Book
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="story"
                  name="content-type"
                  className="hidden peer"
                />
                <label
                  htmlFor="story"
                  className="cursor-pointer px-3 py-1 text-xs text-blue-300 peer-checked:bg-blue-900/30 peer-checked:text-blue-200 rounded-full border border-blue-800"
                >
                  Story
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="research"
                  name="content-type"
                  className="hidden peer"
                />
                <label
                  htmlFor="research"
                  className="cursor-pointer px-3 py-1 text-xs text-blue-300 peer-checked:bg-blue-900/30 peer-checked:text-blue-200 rounded-full border border-blue-800"
                >
                  Research
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerateClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer rounded-lg py-3 font-medium shadow-lg flex items-center justify-center group transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <span>Generate Content</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="px-6 py-4 bg-black/20 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>AI-powered</span>
            </div>
            <div className="text-xs text-gray-400">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
              System ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
