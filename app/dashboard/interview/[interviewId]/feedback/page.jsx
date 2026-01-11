"use client";
import { eq } from "drizzle-orm";
import { UserAnswer } from "@/utils/schema";
import { db } from "@/utils/db";
import React, { useEffect, useState, use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const { interviewId } = use(params);

  // 🔢 Calculate overall rating dynamically
  const overallRating =
    feedbackList.length > 0
      ? Math.round(
          feedbackList.reduce((sum, item) => sum + Number(item.rating), 0) /
            feedbackList.length
        )
      : 0;

  // 🧠 Generate smart overall feedback
  const getOverallFeedback = (rating) => {
    if (rating >= 85) {
      return {
        title: "Excellent Performance",
        message:
          "You demonstrated strong technical knowledge and clear communication. You are well-prepared for real interviews.",
      };
    }

    if (rating >= 70) {
      return {
        title: "Good Performance",
        message:
          "You performed well overall, but there are a few areas where clarity and depth can be improved.",
      };
    }

    if (rating >= 50) {
      return {
        title: "Average Performance",
        message:
          "Your fundamentals are present, but more structured answers and practice are recommended.",
      };
    }

    return {
      title: "Needs Improvement",
      message:
        "Focus on strengthening core concepts and practicing interview-style responses.",
    };
  };

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  return (
    <div className="relative min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Interview Feedback
          </h2>
          <p className="text-gray-600 mt-2">
            Review your answers, strengths, and areas for improvement
          </p>
        </div>

        {/* Empty State */}
        {feedbackList?.length === 0 && (
          <div className="border border-black/10 rounded-xl p-6 text-center text-gray-600 mb-8">
            No feedback available for this interview.
          </div>
        )}

        {/* Overall Score */}
        {feedbackList.length > 0 &&
          (() => {
            const summary = getOverallFeedback(overallRating);

            return (
              <div className="relative rounded-2xl border border-black/10 bg-gray-50 p-6 mb-10">
                <h2 className="text-sm text-gray-500">
                  Overall Interview Result
                </h2>

                <p className="text-3xl font-bold mt-1">2%</p>

                <h3 className="font-semibold mt-3">{summary.title}</h3>

                <p className="text-gray-600 mt-1 max-w-xl">{summary.message}</p>

                {/* Watermark */}
                <div className="absolute bottom-4 right-5 text-[10px] text-gray-400 opacity-50 select-none">
                  Made by Arfan Pathan
                </div>
              </div>
            );
          })()}

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="w-full flex justify-between items-center gap-4 p-4 rounded-xl border border-black/10 bg-white hover:bg-gray-50 transition text-left">
                <span className="font-medium">{item.question}</span>
                <ChevronsUpDownIcon className="h-4 w-4 text-gray-500" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="relative mt-3 rounded-xl border border-black/10 bg-white p-5 space-y-4">
                  <div className="text-sm">
                    <strong>Rating:</strong>{" "}
                    <span className="text-gray-700">{item.rating}%</span>
                  </div>

                  <div className="text-sm text-gray-700">
                    <strong>Your Answer:</strong>
                    <p className="mt-1">{item.userAns}</p>
                  </div>

                  <div className="text-sm text-gray-700">
                    <strong>Ideal Answer:</strong>
                    <p className="mt-1">{item.correctAns}</p>
                  </div>

                  <div className="text-sm text-gray-700">
                    <strong>Feedback:</strong>
                    <p className="mt-1">{item.feedback}</p>
                  </div>

                  {/* Card watermark */}
                  <div className="absolute bottom-4 right-5 text-[15px] text-gray-400 opacity-50 select-none">
                    Made by Arfan Pathan
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Action */}
        <div className="flex justify-end mt-12">
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>

      {/* Page watermark */}
      <div className="fixed bottom-4 right-6 text-xs text-gray-500 select-none">
        <span>Made By </span>
        <span className="font-medium text-gray-700">Arfan Pathan</span>
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

export default Feedback;
