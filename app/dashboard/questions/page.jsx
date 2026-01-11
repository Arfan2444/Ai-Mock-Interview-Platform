import React from "react";

function QuestionsPage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold tracking-tight">
            Interview Questions
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            Understand how our AI generates smart, job-focused interview
            questions tailored to your role and experience.
          </p>
        </div>

        {/* Question Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <QuestionCard
            title="Technical Questions"
            description="Role-specific technical questions based on your selected job position and experience level."
            examples={[
              "Explain React component lifecycle",
              "What is REST API?",
              "Difference between SQL and NoSQL databases",
            ]}
          />

          <QuestionCard
            title="Conceptual Questions"
            description="Test your understanding of core concepts rather than memorization."
            examples={[
              "Why do we use indexes in databases?",
              "Explain state management",
              "What is system scalability?",
            ]}
          />

          <QuestionCard
            title="Scenario-Based Questions"
            description="Real-world problems to evaluate decision-making and problem-solving skills."
            examples={[
              "How would you optimize a slow API?",
              "Handle high traffic on your application",
            ]}
          />

          <QuestionCard
            title="Behavioral Questions"
            description="Evaluate communication skills and professional behavior."
            examples={[
              "Tell me about a challenging project",
              "How do you handle deadlines?",
            ]}
          />
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

function QuestionCard({ title, description, examples }) {
  return (
    <div className="group rounded-2xl border border-black/10 bg-white p-7 transition hover:border-black/20 hover:shadow-md">
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-600 mb-5 leading-relaxed">
        {description}
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {examples.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionsPage;
