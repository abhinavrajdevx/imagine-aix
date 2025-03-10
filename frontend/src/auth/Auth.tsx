import React, { useState } from "react";
import axios from "axios";

// Interfaces for type safety
interface LoginData {
  username: string;
  password: string;
}

interface SignupData extends LoginData {
  email: string;
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
      alert("Login successful!");
      window.location.href = "/";
      // TODO: Add navigation logic (e.g., history.push('/dashboard'))
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
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
      alert("Signup successful!");
      // TODO: Add navigation logic (e.g., history.push('/dashboard'))
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={isLogin ? handleLogin : handleSignup}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={isLogin ? loginData.username : signupData.username}
                onChange={isLogin ? handleLoginChange : handleSignupChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Input (Signup Only) */}
            {!isLogin && (
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={isLogin ? loginData.password : signupData.password}
                onChange={isLogin ? handleLoginChange : handleSignupChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
