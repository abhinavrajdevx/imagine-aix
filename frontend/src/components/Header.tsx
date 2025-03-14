import { Brain, Search } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currrent_tab, set_current_tab] = useState("");

  useEffect(() => {
    // Check if token cookie exists
    const checkAuth = () => {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("token=")
      );
      setIsAuthenticated(!!tokenCookie);
    };

    checkAuth();
    const current_path = window.location.pathname;
    set_current_tab(current_path);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Imagine AiX
              </h1>
              <p className="text-xs text-gray-400">
                AI-powered content generation
              </p>
            </div>
          </div>

          {/* Navigation - Only shown when authenticated */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className={
                  currrent_tab == "/"
                    ? "text-blue-400 border-b-2 border-blue-500 pb-1 text-sm font-medium"
                    : "text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                }
              >
                Create
              </a>
              <a
                href="/explore"
                className={
                  currrent_tab == "/explore"
                    ? "text-blue-400 border-b-2 border-blue-500 pb-1 text-sm font-medium"
                    : "text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                }
              >
                Explore
              </a>
              <a
                href="/templates"
                className={
                  currrent_tab == "/templates"
                    ? "text-blue-400 border-b-2 border-blue-500 pb-1 text-sm font-medium"
                    : "text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                }
              >
                Templates
              </a>
              <a
                href="imagine_library"
                className={
                  currrent_tab == "/imagine_library"
                    ? "text-blue-400 border-b-2 border-blue-500 pb-1 text-sm font-medium"
                    : "text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                }
              >
                imagine Library
                <span className="absolute -top-1 -right-2 h-4 w-4 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </a>
            </nav>
          )}

          {/* User Profile or Login Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
                />
              </svg>
            </button>
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                      AI
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <a
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-colors shadow-md"
              >
                Log in
              </a>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (shown when menu button is clicked) */}
      {mobileMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          {isAuthenticated ? (
            <>
              <a
                href="#"
                className="block py-2 text-blue-400 border-b border-gray-800"
              >
                Create
              </a>
              <a href="#" className="block py-2 text-gray-400">
                Explore
              </a>
              <a href="#" className="block py-2 text-gray-400">
                Templates
              </a>
              <a href="#" className="block py-2 text-gray-400">
                My Library
              </a>
            </>
          ) : (
            <a href="/auth" className="block py-2 text-blue-400">
              Log in
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
