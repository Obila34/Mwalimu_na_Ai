
import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askScienceFact(elementName: string, question: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a friendly primary school science teacher in Kenya. 
      The student is learning about ${elementName}. 
      Answer the following question simply and clearly for a 10-year-old: ${question}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Jambo! I had a little trouble finding that answer. Can you ask again?";
  }
}

export async function getVibeCheckQuestion(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a fun, simple multiple choice quiz question about "${topic}" for a primary school student in Kenya. 
      Use local context if possible. Use a friendly tone with Kenyan nuances like 'Sawa?'.
      Return a JSON object with properties: question (string), options (array of 4 strings), and correctIndex (number 0-3).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.NUMBER }
          },
          required: ["question", "options", "correctIndex"]
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return null;
  }
}

export async function textToSpeech(text: string): Promise<string | undefined> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak warmly and encouragingly like a Kenyan teacher: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return undefined;
  }
}
