import React, { useState } from "react";
import { generate } from "../apis/generate";

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
    console.log("res", res.message)
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
    <div>
      <h1 className="text-2xl my-9 text-center font-bold tracking-wider">
        Generate Book / Story / Research paper <br /> from Imagination.
      </h1>
      <div className="flex w-screnn flex-grow items-center justify-center">
        <div className="text-center font-bold bg-white rounded-3xl p-4 shadow-lg border w-full max-w-[600px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Book description</span>
          </div>

          <div className="bg-gray-100 rounded-2xl p-4 mb-1">
            <textarea
              value={book_prompt}
              rows={3}
              onChange={(e) => set_book_prompt(e.target.value)}
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
          <button
            onClick={handleGenerateClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-2xl py-4 mt-4 font-semibold"
          >
            {loading ? "loading..." : "Generate"}
          </button>
          <button className="w-full border-2 border-blue-600 hover:bg-blue-100 text-blue-600 cursor-pointer rounded-2xl py-4 mt-4 font-semibold">
            My library
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
