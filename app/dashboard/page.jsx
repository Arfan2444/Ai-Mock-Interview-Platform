import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Create and start your AI mock interviews
          </p>
        </div>

        {/* Create Section */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6">
            Create New Interview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AddNewInterview />
          </div>
        </div>

        {/* Previous Interviews */}
        <div className="border-t border-black/10 pt-10">
          <InterviewList />
        </div>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 right-6 text-xs text-gray-500 select-none">
        <span>Made By </span>
        <span className="font-medium text-gray-700">
          Arfan Pathan
        </span>
        <span className="mx-1">|</span>
        <a
          href="https://www.linkedin.com/in/arfanpathan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          LinkedIn
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://github.com/Arfan2444"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
