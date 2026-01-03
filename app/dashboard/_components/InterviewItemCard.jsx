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
    <div className="border shadow-sm rounded-lg p-3">
      <h2>Role: {interview?.jobPosition}</h2>
      <h2>Experience: {interview?.jobExperience}</h2>
      <h2>createdat: {interview?.createdAt}</h2>
      <div className="flex justify-between mt-3 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
        >
          View Feedback
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onStart}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
