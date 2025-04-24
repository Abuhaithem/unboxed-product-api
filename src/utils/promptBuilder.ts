export const buildPrompt = (productDetails: string, url: string): string => {
  return `
You are a helpful assistant that extracts structured product data from the following content.

Product Details from HTML:
"""
${productDetails}
"""

Based on the information above, extract and return the product data in the following JSON format:
{
  "url": ${url},
  "title": "string",
  "description": "string",
  "category": "string",
  "brand": "string",
  "imageUrls": [
    "string",
  ],
  "pricing": {
    "rawPrice": number,
    "currency": "USD",
    "originalPrice": number,
    "discountPrice": number
  },
  "attributes": {
    "colorOptions": "string"[],
    "material": "string",
    "gender": "string",
    "availability": "string"
  },
  "metadata": {
    "scrapedAt": now date(),
    "source": "string",
  }
}


Ensure the JSON is valid and only include fields that can be confidently determined. Do not include any markdown formatting or code block delimiters in your response. If specific color or size options are not clearly identifiable, leave those arrays empty.
`;
};
