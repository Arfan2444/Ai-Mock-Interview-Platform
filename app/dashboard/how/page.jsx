import React from "react";

function HowItWorksPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">How It Works</h1>
        <p className="text-gray-500 mt-2">
          Practice interviews in 4 simple steps using AI.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StepCard
          step="01"
          title="Create Interview"
          description="Choose your job role, experience level, and interview type."
        />

        <StepCard
          step="02"
          title="AI Generates Questions"
          description="Our AI creates tailored interview questions based on your inputs."
        />

        <StepCard
          step="03"
          title="Answer Questions"
          description="Answer questions in real-time like a real interview."
        />

        <StepCard
          step="04"
          title="Get AI Feedback"
          description="Receive instant feedback, strengths, weaknesses, and improvement tips."
        />
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Ready to start practicing?
        </h2>
        <p className="text-gray-500 mt-2">
          Create your first AI mock interview from the dashboard.
        </p>
      </div>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex gap-4">
      <div className="text-2xl font-bold text-primary">{step}</div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default HowItWorksPage;
