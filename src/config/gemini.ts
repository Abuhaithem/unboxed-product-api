import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey =
  process.env.geminiApiKey ??
  (() => {
    throw new Error("geminiApiKey is not defined in environment variables");
  })();
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

console.log("Gemini model initialized successfully.");
