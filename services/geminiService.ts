
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const classifyWaste = async (description: string, imageBase64?: string) => {
  // Model selection based on guidelines for basic tasks
  const model = 'gemini-3-flash-preview';
  
  const prompt = `You are an AI waste classification assistant for the Mango System. 
Based on the provided description or image, please provide the following information in JSON format:
1. Item name (itemName)
2. Disposal method (disposalMethod)
3. Estimated collection cost or points (estimatedValue)
4. Precautions (precautions)

User Input: ${description}`;

  const contents = imageBase64 ? {
    parts: [
      { text: prompt },
      { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }
    ]
  } : { parts: [{ text: prompt }] };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemName: { type: Type.STRING },
            disposalMethod: { type: Type.STRING },
            estimatedValue: { type: Type.STRING },
            precautions: { type: Type.STRING },
          },
          required: ["itemName", "disposalMethod"],
          propertyOrdering: ["itemName", "disposalMethod", "estimatedValue", "precautions"]
        }
      }
    });

    // Access the .text property directly (not a method)
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini classification failed:", error);
    return null;
  }
};

export const getAIAdvice = async (message: string) => {
  const model = 'gemini-3-flash-preview';
  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: "You are 'MangoBot', the official mascot and helper of the 'Mango System', which promotes environmental protection and resource circulation. Guide users on waste separation and environmental protection with a kind and bright energy."
      }
    });
    // Access the .text property directly (not a method)
    return response.text || "Sorry, MangoBot is a bit quiet right now!";
  } catch (error) {
    console.error("Gemini advice failed:", error);
    return "Sorry, MangoBot is thinking right now. Please ask again in a moment!";
  }
};
