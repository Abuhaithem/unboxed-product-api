import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { getOpenAIClient } from "../config/openai";
// import { buildPrompt } from "../utils/promptBuilder";
import { model } from "../config/gemini";
import { buildPrompt } from "../utils/promptBuilder";
import { preprocessHtml } from "../utils/extractProductDetails";

export const parseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body;

  try {
    if (!url || !process.env.geminiApiKey) {
      res.status(400).json({ error: "Missing URL or OpenAI API key" });
      return;
    }
    const { data: html } = await axios.get<string>(url);

    // Preprocess the HTML to extract relevant sections
    const productHtml = preprocessHtml(html);
    console.log(productHtml);
    const prompt = buildPrompt(productHtml, url);

    const response = await model.generateContent(prompt);

    let message = response.response.text();
    if (!message) throw new Error("Empty response from Gemini");

    // Remove any leading/trailing backticks and "json" identifier
    message = message.trim();
    if (message.startsWith("```json")) {
      message = message.substring("```json".length).trim();
    }
    if (message.endsWith("```")) {
      message = message.slice(0, -3).trim();
    }

    const parsedData = JSON.parse(message);
    res.status(200).json(parsedData);
  } catch (err) {
    res.status(500).json({
      error: "Failed to parse product data",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
