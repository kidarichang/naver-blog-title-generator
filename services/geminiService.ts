
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { GenerationResult } from "../types";

export const generateTitles = async (city: string): Promise<GenerationResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    대상 도시: ${city}
    
    위 도시를 기준으로 다음을 생성하세요:
    1. '${city}' 명칭을 사용한 제목 10세트
    2. '${city}' 내부에 있는 실제 구/동 이름을 랜덤하게 사용하여 50세트
    총 60세트의 JSON 데이터를 생성해줘. 모든 제목에는 '선불폰' 또는 '선불유심' 키워드가 반드시 포함되어야 해.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              districtOrDong: { type: Type.STRING },
              titlePrepaidPhone: { type: Type.STRING },
              titlePrepaidUSIM: { type: Type.STRING }
            },
            required: ["districtOrDong", "titlePrepaidPhone", "titlePrepaidUSIM"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("API 응답이 비어있습니다.");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating titles:", error);
    throw error;
  }
};
