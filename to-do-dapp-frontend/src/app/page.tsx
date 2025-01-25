"use client";

import React, { useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      title: "User Account Management",
      description:
        "Enable users to create accounts using either an EVM wallet or a generated keypair securely stored in local storage.",
    },
    {
      title: "Task Creation",
      description:
        "Allow users to create tasks with a title, description, and due date to organize their activities effectively.",
    },
    {
      title: "Task Updates",
      description:
        "Provide the ability to update task details such as title, description, and due date to reflect changes dynamically.",
    },
  ];

  const toggleFeature = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse the feature if it is already expanded
    } else {
      setActiveIndex(index); // Expand the feature
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Task Management System</h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Organize your tasks with ease. Stay on top of deadlines, track
          progress, and boost productivity with our powerful and easy-to-use
          platform.
        </p>
        <button className="bg-indigo-500 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-semibold text-lg transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300"
                onClick={() => toggleFeature(index)}
              >
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                {activeIndex === index && (
                  <div className="text-indigo-500 mt-4">
                    <strong>Feature Details:</strong> More detailed explanation
                    of the feature will appear here.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
