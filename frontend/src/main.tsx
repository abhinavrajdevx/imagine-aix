import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Bookpage from "./pages/Book";
import AllBooks from "./pages/AllBooks";
import AuthPage from "./auth/Demo";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/demo" element={<AuthPage />} />
      <Route path="/book/:id" element={<Bookpage />} />
      <Route path="/imagine_library/" element={<AllBooks />} />
    </Routes>
  </BrowserRouter>
);
