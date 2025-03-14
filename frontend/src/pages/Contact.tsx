import React, { useState } from "react";
import Header from "../components/Header";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center border border-blue-400">
                <div className="h-10 w-10 rounded-full bg-blue-400 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Imagine AiX</h1>
            <p className="text-blue-200 text-opacity-80">
              Get in touch with our team
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Contact Form Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 flex-1">
              <h2 className="text-xl font-semibold text-white mb-4">
                Send us a message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    Message Sent
                  </h3>
                  <p className="text-blue-200">We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-blue-200 text-sm font-medium mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-blue-200 text-sm font-medium mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-blue-200 text-sm font-medium mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white h-32 resize-none"
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg transition-all hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Send Message
                  </button>
                </form>
              )}

              {/* AI Animation Elements */}
              <div className="mt-6 pt-6 border-t border-blue-300 border-opacity-20">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-8 bg-blue-400 rounded-full opacity-75 animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-xs text-blue-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-ping"></div>
                    AI assistant online
                  </div>
                </div>
              </div>
            </div>

            {/* Company Contact Details */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 md:w-96">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-blue-300 font-medium mb-2">
                    General Inquiries
                  </h3>
                  <div className="space-y-2 text-white">
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      info@neuralconnect.ai
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      +1 (800) 555-0123
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-300 font-medium mb-2">
                    Human Resources
                  </h3>
                  <div className="space-y-2 text-white">
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      Sarah Johnson, HR Director
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      hr@neuralconnect.ai
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      +1 (800) 555-0124 ext. 102
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-300 font-medium mb-2">
                    Business Development
                  </h3>
                  <div className="space-y-2 text-white">
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      partnerships@neuralconnect.ai
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-blue-300 font-medium mb-2">
                    Office Location
                  </h3>
                  <p className="text-white flex">
                    <svg
                      className="w-5 h-5 mr-3 text-blue-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span>
                      123 Innovation Drive
                      <br />
                      Suite 500
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
