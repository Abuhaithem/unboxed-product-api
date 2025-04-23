🧐 unboxed-product-api

A TypeScript + Express REST API that converts product page URLs into clean, structured data using Google’s Generative AI and HTML preprocessing.

✨ Overview

This API accepts a live product URL and your Google Generative AI API key, scrapes the page, preprocesses it to extract visible text, then uses an LLM to generate a structured JSON product card.

📦 Tech Stack

Node.js + Express.js

TypeScript

@google/generative-ai

Cheerio (for HTML preprocessing)

Axios (for HTTP requests)

dotenv (for local environment config)

🚀 Endpoint

POST /parse-product

📅 Request Body

{
"url": "https://example.com/product/123",
"apiKey": "YOUR_GOOGLE_API_KEY"
}

📄 Sample Response

{
"url": "https://example.com/product/123",
"title": "Sample Hoodie",
"category": "Apparel",
"attributes": {
"colorOptions": ["Black", "White"],
"sizeOptions": ["S", "M", "L"]
},
"rawPrice": 49.99
}

🧪 How It Works

URL Fetching: Fetches the raw HTML of the given product page.

Preprocessing: Uses Cheerio to strip out non-visible elements (<script>, <style>, etc.) and normalize the content.

LLM Prompting: Sends the cleaned text to Google Generative AI with a carefully crafted prompt.

Response Formatting: Parses the AI response into a structured JSON format.

📼 Preprocessing Strategy

import \* as cheerio from "cheerio";

export const preprocessHtml = (rawHtml: string): string => {
const $ = cheerio.load(rawHtml);
$("script, style, head, meta, noscript, link, iframe").remove();
const text = $("body").text();
return text.replace(/\s+/g, " ").trim();
};

🤠 Prompt Strategy (Simplified)

"You are a helpful assistant that extracts product data from website text..."

Only the most relevant content is passed to the model to avoid noise and reduce token usage.

🛠 Local Setup

git clone https://github.com/yourusername/unboxed-product-api.git
cd unboxed-product-api
npm install
cp .env.example .env

# Add your GOOGLE_API_KEY to the .env file

npm run dev

📄 .env File

PORT=3000
GOOGLE_API_KEY=your-google-api-key

🔍 Notes & Tradeoffs

✅ Preprocessing improves data accuracy by reducing LLM hallucination.

✅ Uses a flexible output schema for diverse product types.

❗ Does not support pagination or JS-rendered sites.

🧪 You may need to tune prompt and token limits based on site complexity.

📬 Submission Requirements

✅ Live deployed API URL

✅ GitHub repository with this README

✅ Loom walkthrough (2–5 min)
