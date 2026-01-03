import React from "react";

function QuestionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Interview Questions
        </h1>
        <p className="text-gray-500 mt-2">
          Understand how our AI generates smart, job-focused interview
          questions.
        </p>
      </div>

      {/* Question Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}

function QuestionCard({ title, description, examples }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>

      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {examples.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionsPage;
