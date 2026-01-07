
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const classifyWaste = async (description: string, imageBase64?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `당신은 망고 시스템의 인공지능 폐기물 분류 도우미입니다. 
사용자가 제공한 설명이나 이미지를 바탕으로 다음 정보를 JSON 형식으로 제공해주세요:
1. 폐기물 품목 (itemName)
2. 분리배출 방법 (disposalMethod)
3. 예상 수거 비용 또는 포인트 (estimatedValue)
4. 주의사항 (precautions)

사용자 입력: ${description}`;

  const contents = imageBase64 ? {
    parts: [
      { text: prompt },
      { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }
    ]
  } : prompt;

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
          required: ["itemName", "disposalMethod"]
        }
      }
    });

    return JSON.parse(response.text);
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
        systemInstruction: "당신은 환경 보호와 자원 순환을 돕는 '망고 시스템'의 공식 마스코트이자 도우미 '망고봇'입니다. 사용자에게 친절하고 밝은 에너지로 분리배출과 환경 보호에 대해 안내하세요."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini advice failed:", error);
    return "죄송해요, 망고봇이 잠시 생각 중이에요. 잠시 후 다시 물어봐주세요!";
  }
};
