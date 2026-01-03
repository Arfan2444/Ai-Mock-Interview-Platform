"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import RecordAnswerSection from "./_components/RecordAnswerSection";

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
    console.log(params);
    GetInterviewDetails();
  }, [params]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    if (result.length > 0) {
      setInterviewdata(result[0]); // 👈 store only the object, not the array
    }
    let jsonMockResp = result[0].jsonMockResp;

    try {
      // first parse to remove outer quotes
      jsonMockResp = JSON.parse(jsonMockResp);

      // second parse to get actual object/array
      if (typeof jsonMockResp === "string") {
        jsonMockResp = JSON.parse(jsonMockResp);
      }

      setMockInterviewQuestion(jsonMockResp);
      console.log(jsonMockResp);
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }

    setMockInterviewQuestion(jsonMockResp);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video/ Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewdata={interviewdata}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewdata?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
