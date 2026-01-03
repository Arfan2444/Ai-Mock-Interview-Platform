"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { sendChatMessage } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewdata,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast("Error while saving your answer, Please record again. ");
    //   return;
    // }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPropmt =
      "Question" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      " , User Answer:" +
      userAnswer +
      ",Depends on question and user answer for give interview question" +
      " please give us rating for answer and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await sendChatMessage(feedbackPropmt);

    const mockJsonResp = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewdata?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center my-20 items-center rounded-lg p-5">
        <Image
          src={`/webcam.png`}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: `100%`, zIndex: 10 }}
        />
      </div>

      <Button disabled={loading} variant="outline" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
