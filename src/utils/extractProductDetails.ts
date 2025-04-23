import * as cheerio from "cheerio";

export const preprocessHtml = (rawHtml: string): string => {
  const $ = cheerio.load(rawHtml); // Remove script, style, head, and other non-visible tags

  $("script, style, head, meta, noscript, link, iframe").remove(); // Get the visible text content

  const text = $("body").text(); // Normalize whitespace and trim

  return text.replace(/\s+/g, " ").trim();
};
