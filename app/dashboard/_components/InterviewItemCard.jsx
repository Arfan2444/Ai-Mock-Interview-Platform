import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {interview?.jobPosition}
        </h2>
        <p className="text-sm text-gray-500">
          {interview?.jobExperience} year(s) experience
        </p>
      </div>

      {/* Meta */}
      <div className="text-sm text-gray-400 mb-4">
        Created on {new Date(interview?.createdAt).toLocaleDateString()}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={onFeedback}
        >
          View Feedback
        </Button>

        <Button size="sm" className="flex-1" onClick={onStart}>
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
