import React, { useState } from "react";
import Header from "../components/Header"; // Assuming you have a Header component
import { TEMPLATES } from "../constants";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Example template data
  const templates = TEMPLATES;

  // Categories for filter
  const categories = ["All", "Book", "Story", "Research"];

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTryTemplate = (template: {
    id?: number;
    title: any;
    description?: string;
    category?: string;
    icon?: string;
    gradient?: string;
    bgGradient?: string;
  }) => {
    // Logic to use the selected template (you can expand this based on your app's needs)
    console.log(`Selected template: ${template.title}`);
    // Redirect to creation page with template pre-selected
    // or pre-fill the form, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Page title with particles */}
        <div className="relative mb-12 mt-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            Content Templates
          </h1>
          <p className="text-blue-200 text-center mt-3 text-lg max-w-2xl mx-auto">
            Choose from a variety of AI-powered templates to jumpstart your
            creative projects
          </p>

          {/* Decorative elements */}
          <div className="absolute -top-10 right-1/4 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div
            className="absolute top-10 left-1/4 w-16 h-16 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -bottom-4 right-1/3 w-12 h-12 bg-cyan-500 rounded-full opacity-20 blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Search and filter */}
        <div className="backdrop-blur-sm bg-white/10 rounded-xl border border-gray-700 shadow-lg mb-8 p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full bg-gray-800/40 text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-700 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-gray-800/40 text-blue-300 border border-gray-700 hover:bg-gray-800/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`backdrop-blur-sm bg-gradient-to-br ${template.bgGradient} rounded-xl border border-gray-700 shadow-lg overflow-hidden group hover:shadow-xl hover:border-gray-600 transition-all duration-300`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{template.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {template.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-800/40 text-blue-300 inline-block mt-1">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div
                      className={`h-2 w-2 rounded-full bg-${
                        template.gradient.split("-")[1]
                      }-400`}
                    ></div>
                    <div
                      className={`h-2 w-2 rounded-full bg-${
                        template.gradient.split("-")[3]
                      }-400`}
                    ></div>
                  </div>
                </div>

                <p className="text-blue-200 mb-6 text-sm">
                  {template.description}
                </p>

                <button
                  onClick={() => handleTryTemplate(template)}
                  className={`w-full bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white rounded-lg py-3 font-medium flex items-center justify-center group transition-all duration-300`}
                >
                  <span>Try This Template</span>
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-3 bg-black/20 flex items-center justify-between">
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
                  <span>AI-optimized</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                  Ready to use
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredTemplates.length === 0 && (
          <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-gray-700 p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-blue-300 mb-2">
              No templates found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Footer with pulsing effect */}
      <div className="py-6 text-center text-blue-300/60 text-sm relative overflow-hidden">
        <div className="relative z-10">Powered by advanced AI algorithms</div>
        <div className="absolute left-1/2 bottom-0 w-64 h-32 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Templates;
