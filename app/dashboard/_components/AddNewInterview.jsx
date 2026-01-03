"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendChatMessage } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Job Experience: ${jobExperience},
      Based on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.
      Include "question" and "answer" fields in each object.
    `;

    try {
      const result = await sendChatMessage(InputPrompt);
      //console.log("AI Response:", result);
      // Parse JSON if the AI followed your format
      const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const mockdata = JSON.parse(cleaned);
      console.log("Parsed Questions:", mockdata);
      setJsonResponse(mockdata);
      setLoading(false);

      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockdata),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted Id: ", resp);
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
      //   setQuestions(data);
    } catch (error) {
      console.error("Error generating interview questions:", error);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your Job Interviewing
              </DialogTitle>
              <DialogDescription>
                Add details about your job position/role, job description, and
                years of experience.
              </DialogDescription>
              <div className="mt-3 my-2">
                <label>Job Role/Job Position</label>
                <Input
                  placeholder="Fullstack developer"
                  required
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>
              <div className="mt-3 my-2">
                <label>Job Decription/ Tech Stack </label>
                <Textarea
                  placeholder="React, Angular, Docker, Prisma"
                  required
                  onChange={(event) => setJobDesc(event.target.value)}
                />
              </div>
              <div className="mt-3 my-2">
                <label>Years of Experience</label>
                <Input
                  placeholder="5"
                  type="number"
                  max="50"
                  required
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
            </DialogHeader>

            {/* ✅ move this OUTSIDE of DialogDescription */}
            <div className="flex gap-5 justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    "Generating From AI"
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewInterview;
