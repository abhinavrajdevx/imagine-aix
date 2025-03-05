import { Brain, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-library-800 text-book-page p-4 shadow-md flex justify-between w-screen">
      <div className="container mx-auto flex items-center">
        <Brain className="mr-3 text-book-gold" size={28} />
        <h1 className="text-3xl font-serif font-bold">imagine AiX</h1>
      </div>
      <div className=" justify-end flex items-center gap-6">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="font-serif text-slate-500 hover:text-black"
        >
          Generate{" "}
        </button>
        <button
          onClick={() => {
            window.location.href = "/imagine_library";
          }}
          className="w-[120px] font-serif text-slate-500 hover:text-black"
        >
          {"Imagine Library"}
        </button>
        <button
          onClick={() => {
            window.location.href = "/auth";
          }}
          className="font-serif bg-black rounded-lg px-3 py-2 text-white w-[100px]"
        >
          {"Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;
