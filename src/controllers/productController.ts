import { Request, Response } from "express";
import axios from "axios";
import { getOpenAIClient } from "../config/openai";
import { buildPrompt } from "../utils/promptBuilder";
import { preprocessHtml } from "../utils/extractProductDetails";

export const parseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url, openaiApiKey } = req.body;

  try {
    if (!url || !openaiApiKey) {
      res.status(400).json({ error: "Missing URL or OpenAI API key" });
      return;
    }

    // Fetch the raw HTML
    const { data: html } = await axios.get<string>(url);

    const productHtml = preprocessHtml(html);
    const prompt = buildPrompt(productHtml, url);

    const openai = getOpenAIClient(openaiApiKey);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts structured product data from raw HTML content and returns valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let message = response.choices[0].message.content?.trim();
    if (!message) throw new Error("Empty response from OpenAI");

    if (message.startsWith("```json")) {
      message.substring("```json".length).trim();
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
