import React from "react";

function HowItWorksPage() {
  return (
    <div className="relative min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold tracking-tight">
            How It Works
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl">
            Practice interviews in four simple steps using our AI-powered
            interview engine.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
            description="Answer questions in real-time just like a real interview."
          />

          <StepCard
            step="04"
            title="Get AI Feedback"
            description="Receive instant feedback, strengths, weaknesses, and improvement tips."
          />
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold">
            Ready to start practicing?
          </h2>
          <p className="text-gray-600 mt-2">
            Create your first AI mock interview from the dashboard.
          </p>
        </div>
      </div>

      {/* Page Watermark */}
      <div className="fixed bottom-4 right-6 text-xs text-gray-500 select-none">
        Made By{" "}
        <span className="font-medium text-gray-700">
          Arfan Pathan
        </span>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/arfanpathan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          LinkedIn
        </a>{" "}
        |{" "}
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

function StepCard({ step, title, description }) {
  return (
    <div className="relative flex gap-6 rounded-2xl border border-black/10 bg-white p-7 transition hover:border-black/20 hover:shadow-sm">
      
      {/* Step Number */}
      <div className="text-3xl font-bold text-gray-400">
        {step}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold mb-1">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Card watermark */}
      <div className="absolute bottom-4 right-5 text-[10px] text-gray-400 opacity-50 select-none">
        Made by Arfan Pathan
      </div>
    </div>
  );
}

export default HowItWorksPage;
