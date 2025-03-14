import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

// Interfaces for type safety
interface LoginData {
  username: string;
  password: string;
}

interface SignupData extends LoginData {
  email: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const API_BASE_URL = "https://server.abhinavraj.tech/imagine-aix/api/user"; // Update with your backend URL

const AuthPage: React.FC = () => {
  // State for managing form type and form data
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Form validation state
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  // Handle input changes for login form
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for signup form
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev: any) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev: any[]) =>
        prev.filter((toast: { id: number }) => toast.id !== id)
      );
    }, 4000);
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (isLogin) {
      // Login validation
      if (!loginData.username) newErrors.username = "Username is required";
      if (!loginData.password) newErrors.password = "Password is required";
    } else {
      // Signup validation
      if (!signupData.username) newErrors.username = "Username is required";
      if (!signupData.email) newErrors.email = "Email is required";
      if (!signupData.password) newErrors.password = "Password is required";

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (signupData.email && !emailRegex.test(signupData.email)) {
        newErrors.email = "Invalid email format";
      }

      // Password strength validation
      if (signupData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);

      // Store token and user info
      // localStorage.setItem("token", response.data.token);
      window.document.cookie = `token=Bearer ${response.data.token}`;
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);

      // Redirect or update app state
      showToast("Login successful! Redirecting...", "success");

      window.location.href = "/";
      // TODO: Add navigation logic (e.g., history.push('/dashboard'))
    } catch (error: any) {
      showToast("Username or Password might be incorrect...", "error");
    }
  };

  // Handle signup submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, signupData);

      // Store token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);

      // Redirect or update app state
      showToast("Signup successful!", "success");
      // TODO: Add navigation logic (e.g., history.push('/dashboard'))
    } catch (error: any) {
      showToast("Signup failed, User might already exist...", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 opacity-10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* TOAS */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 items-end">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-3 rounded-lg backdrop-blur-lg shadow-xl flex items-center max-w-xs ${
                toast.type === "success"
                  ? "bg-green-500/20 border border-green-500/30 text-green-100"
                  : "bg-red-500/20 border border-red-500/30 text-red-100"
              }`}
            >
              <div
                className={`mr-3 ${
                  toast.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {toast.type === "success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Neural network lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-1">
              Imagine AiX
            </h2>
            <p className="text-blue-200 mb-6">
              {isLogin ? "Access your AI workspace" : "Join the AI revolution"}
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={isLogin ? handleLogin : handleSignup}
          >
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-blue-200 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-blue-300/30 bg-white/10 backdrop-blur-sm placeholder-blue-300/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Enter your username"
                  value={isLogin ? loginData.username : signupData.username}
                  onChange={isLogin ? handleLoginChange : handleSignupChange}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email Input (Signup Only) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-200 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-blue-300/30 bg-white/10 backdrop-blur-sm placeholder-blue-300/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              )}

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-blue-200 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-blue-300/30 bg-white/10 backdrop-blur-sm placeholder-blue-300/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Enter your password"
                  value={isLogin ? loginData.password : signupData.password}
                  onChange={isLogin ? handleLoginChange : handleSignupChange}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out shadow-lg"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </motion.button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-blue-200">
              {isLogin ? "Need an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-blue-300/70 mt-6">
          Powered by advanced neural networks
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
