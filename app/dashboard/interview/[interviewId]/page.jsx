"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import Webcam from "react-webcam";

const Interview = (props) => {
  const params = use(props.params);
  const [interviewdata, setInterviewdata] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

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
  };

  return (
    <div className="relative min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Let’s Get Started
          </h2>
          <p className="text-gray-600 mt-3">
            Review your interview details and prepare before starting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Interview Details */}
          <div className="flex flex-col gap-8">
            <div className="relative rounded-2xl border border-black/10 bg-white p-6">
              <div className="space-y-4 text-lg">
                <p>
                  <strong>Job Role:</strong>{" "}
                  <span className="text-gray-700">
                    {interviewdata?.jobPosition || "Loading..."}
                  </span>
                </p>
                <p>
                  <strong>Tech Stack:</strong>{" "}
                  <span className="text-gray-700">
                    {interviewdata?.jobDesc || "Loading..."}
                  </span>
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  <span className="text-gray-700">
                    {interviewdata?.jobExperience || "Loading..."}
                  </span>
                </p>
              </div>

              {/* Card watermark */}
              <div className="absolute bottom-4 right-5 text-[10px] text-gray-400 opacity-50 select-none">
                Made by Arfan Pathan
              </div>
            </div>

            {/* Info Box */}
            <div className="relative rounded-2xl border border-black/10 bg-gray-50 p-6">
              <h2 className="flex gap-2 items-center text-sm font-semibold text-black mb-2">
                <Lightbulb className="h-4 w-4" />
                INFORMATION
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </p>

              {/* Card watermark */}
              <div className="absolute bottom-4 right-5 text-[10px] text-gray-400 opacity-50 select-none">
                Made by Arfan Pathan
              </div>
            </div>
          </div>

          {/* Webcam Section */}
          <div className="flex flex-col items-center justify-center gap-6">
            {webCamEnabled ? (
              <div className="rounded-2xl overflow-hidden border border-black/10">
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored
                  className="h-[300px] w-[300px]"
                />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-6">
                <div className="flex items-center justify-center w-full h-72 rounded-2xl border border-dashed border-black/20 bg-gray-50">
                  <WebcamIcon className="h-16 w-16 text-gray-400" />
                </div>

                <Button
                  variant="outline"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam & Microphone
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-end mt-14">
          <Link
            href={`/dashboard/interview/${params.interviewId}/start`}
          >
            <Button className="px-8">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Page Watermark */}
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
};

export default Interview;
