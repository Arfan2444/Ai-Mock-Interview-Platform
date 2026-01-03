import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Create and start your AI mock interviews
        </p>
      </div>

      {/* Create Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New Interview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddNewInterview />
        </div>
      </div>

      {/* Previous Interviews */}
      <div>
        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;
