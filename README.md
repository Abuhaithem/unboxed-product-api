# 🧐 unboxed-product-api

> A TypeScript + Express REST API that converts product page URLs into clean, structured data using OpenAI Key and HTML preprocessing.

---

## ✨ Overview

This API accepts a live product URL and your Google Generative AI API key, scrapes the page, preprocesses it to extract visible text, then uses an LLM to generate a structured JSON product card.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **openAI**
- **Cheerio** (for HTML preprocessing)
- **Axios** (for HTTP requests)
- **dotenv** (for local environment config)

---

## 🚀 Endpoint

### `POST /parse-product`

#### 🗓 Request Body

```json
{
  "url": "https://example.com/product/123",
  "openaiApiKey": "YOUR_OPENAI_API_KEY"
}
```

#### 📄 Sample Response

```json
{
  "url": "https://now-time.biz/collections/current/products/ideal-palace",
  "title": "Ideal Palace",
  "description": "Ideal Palace, a garment inspired by Facteur Cheval's historic monument called the 'Ideal Palace'.",
  "category": "",
  "brand": "",
  "imageUrls": [],
  "pricing": {
    "rawPrice": 40,
    "currency": "USD",
    "originalPrice": 0,
    "discountPrice": 0
  },
  "attributes": {
    "colorOptions": [],
    "material": "100% Ring Spun Cotton",
    "gender": "",
    "availability": "Sold Out"
  },
  "metadata": {
    "scrapedAt": "",
    "source": "HTML Content"
  }
}
```

---

## 🧪 How It Works

1. **URL Fetching**: Fetches the raw HTML of the given product page.
2. **Preprocessing**: Uses Cheerio to strip out non-visible elements (`<script>`, `<style>`, etc.) and normalize the content.
3. **LLM Prompting**: Sends the cleaned text to Google Generative AI with a carefully crafted prompt.
4. **Response Formatting**: Parses the AI response into a structured JSON format.

---

## 🧼 Preprocessing Strategy

```ts
import * as cheerio from "cheerio";

export const preprocessHtml = (rawHtml: string): string => {
  const $ = cheerio.load(rawHtml);
  $("script, style, head, meta, noscript, link, iframe").remove();
  const text = $("body").text();
  return text.replace(/\s+/g, " ").trim();
};
```

---

## 🤠 Prompt Strategy (Simplified)

> "You are a helpful assistant that extracts product data from website text..."

Only the most relevant content is passed to the model to avoid noise and reduce token usage.

---

## 🛠 Local Setup

```bash
git clone https://github.com/yourusername/unboxed-product-api.git
cd unboxed-product-api
npm install
cp .env.example .env
# Add your GOOGLE_API_KEY to the .env file
npm run dev
```

---

## 📄 .env File

```env
PORT=3000
openaiApiKey=your-openai-api-key
```

---

## 🔍 Notes & Tradeoffs

- ✅ Preprocessing improves data accuracy by reducing LLM hallucination.
- ✅ Uses a flexible output schema for diverse product types.
- ❗ Does not support pagination or JS-rendered sites.
- 🧠 You may need to tune prompt and token limits based on site complexity.

---
