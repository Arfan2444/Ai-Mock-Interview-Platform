"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import Webcam from "react-webcam";

const interview = (props) => {
  const params = use(props.params);
  const [interviewdata, setInterviewdata] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params);
    GetInterviewDetails();
  }, [params]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    if (result.length > 0) {
      setInterviewdata(result[0]); // 👈 store only the object, not the array
    }
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role:</strong>
              <span className="font-normal">
                {interviewdata ? interviewdata.jobPosition : "Loading..."}
              </span>
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              <span className="font-normal">
                {interviewdata ? interviewdata.jobDesc : "Loading..."}
              </span>
            </h2>
            <h2 className="text-lg">
              <strong>Job Experience:</strong>
              <span className="font-normal">
                {interviewdata ? interviewdata.jobExperience : "Loading..."}
              </span>
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center mt-3 text-yellow">
              <Lightbulb />
              <strong>INFORMATION</strong>
            </h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary" />
              <Button onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default interview;
