export const buildPrompt = (productDetails: string, url: string): string => {
  return `
You are a helpful assistant that extracts structured product data from the following content.

Product Details from HTML:
"""
${productDetails}
"""

Based on the information above, extract and return the product data in the following JSON format:
{
  "url": "${url}",
  "title": "string",
  "category": "string",
  "attributes": {
    "colorOptions": ["string"],
    "sizeOptions": ["string"]
  },
  "rawPrice": number
}

Ensure the JSON is valid and only include fields that can be confidently determined. Do not include any markdown formatting or code block delimiters in your response. If specific color or size options are not clearly identifiable, leave those arrays empty.
`;
};
