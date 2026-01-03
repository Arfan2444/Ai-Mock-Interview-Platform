import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024,
};

export async function sendChatMessage(message) {
  const result = await ai.models.generateContent({
    model,
    generationConfig,
    contents: [
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
  });

  return result.text;
}
