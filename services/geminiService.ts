import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const improveRequestDescription = async (draft: string, type: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    return "API Key missing. Using original text.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an assistant in a "Smart Campus Services Hub".
      A student is trying to request a service of type: "${type}".
      Their rough draft is: "${draft}".
      
      Please rewrite this into a formal, concise, and polite request description suitable for university administration.
      Keep it under 3 sentences. Do not add filler conversational text, just the formal request.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || draft;
  } catch (error) {
    console.error("Gemini API error:", error);
    return draft; // Fallback
  }
};