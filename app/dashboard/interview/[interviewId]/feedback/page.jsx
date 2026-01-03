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
  useEffect(() => {
    GetFeedback();
  }, []);

  const router = useRouter();

  const { interviewId } = use(params);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-400">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback:</h2>
      <h2 className="text-amber-400 text-lg my-3">
        Your overall interview rating: <strong>85%</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview insights and recommendations:
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-7">
              {item.question} <ChevronsUpDownIcon />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg ">
                  <strong>Rating: </strong>
                  {item.rating}%
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-100 text-sm">
                  <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-100 text-sm">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-100 text-sm">
                  <strong>Feedback:</strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
}

export default Feedback;
