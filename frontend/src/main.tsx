import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Bookpage from "./pages/Book";
import AllBooks from "./pages/AllBooks";
import AuthPage from "./auth/Auth";
import Templates from "./pages/Templates";
import ContactPage from "./pages/Contact";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/book/:id" element={<Bookpage />} />
      <Route path="/imagine_library" element={<AllBooks />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </BrowserRouter>
);
