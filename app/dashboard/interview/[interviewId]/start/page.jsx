"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview(props) {
  const RecordAnswerSection = dynamic(
    () => import("./_components/RecordAnswerSection"),
    { ssr: false }
  );

  const params = use(props.params);
  const [interviewdata, setInterviewdata] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, [params]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result.length > 0) {
      setInterviewdata(result[0]);
    }

    let jsonMockResp = result[0].jsonMockResp;
    try {
      jsonMockResp = JSON.parse(jsonMockResp);
      if (typeof jsonMockResp === "string") {
        jsonMockResp = JSON.parse(jsonMockResp);
      }
      setMockInterviewQuestion(jsonMockResp);
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Mock Interview Session
          </h1>
          <p className="text-gray-600 mt-2">
            Question {activeQuestionIndex + 1} of{" "}
            {mockInterviewQuestion?.length || 0}
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
          <div className="relative rounded-2xl border border-black/10 bg-white p-6">
            <QuestionSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
            />

            {/* Section watermark */}
            <div className="absolute bottom-4 right-5 text-[10px] text-gray-400 opacity-50 select-none">
              Made by Arfan Pathan
            </div>
          </div>

          <div className="relative rounded-2xl border border-black/10 bg-white p-6">
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewdata={interviewdata}
            />

            {/* Section watermark */}
            <div className="absolute bottom-4 right-5 text-[15px] text-gray-400 opacity-50 select-none">
              Made by Arfan Pathan
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {activeQuestionIndex > 0 && (
              <Button
                variant="outline"
                onClick={() =>
                  setActiveQuestionIndex(activeQuestionIndex - 1)
                }
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-4">
            {activeQuestionIndex !==
              mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() =>
                  setActiveQuestionIndex(activeQuestionIndex + 1)
                }
              >
                Next Question
              </Button>
            )}

            {activeQuestionIndex ===
              mockInterviewQuestion?.length - 1 && (
              <Link
                href={`/dashboard/interview/${interviewdata?.mockId}/feedback`}
              >
                <Button>
                  End Interview
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Page watermark */}
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

export default StartInterview;
