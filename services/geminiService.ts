
import { GoogleGenAI, Type } from "@google/genai";
import { FailureCase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface RiskAnalysis {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  predictedFailure: string;
  technicalReason: string;
  preventionChecklist: string[];
  expertInsight: string;
}

export const analyzeRiskScenario = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `당신은 의류 부자재 위험 관리 전문가입니다. 다음 시나리오를 분석하여 위험 요소와 해결책을 제시하십시오: \n\n${prompt}`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });
    return response.text || "분석 결과를 가져올 수 없습니다.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

export const getExpertFailureCase = async (targetType: string, existingCategories: string[]): Promise<FailureCase | null> => {
  try {
    const categoriesStr = existingCategories.join(", ");
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `당신은 의류 품질 관리 시니어 전문가입니다. 
      ${targetType} 부자재와 관련된 실제 산업 현장 사고 사례(Failure Case)를 하나 생성해 주세요.
      
      [분류 규칙]
      1. 가능한 다음 기존 카테고리 중 하나를 선택하여 'trimType'에 입력하십시오: [${categoriesStr}]
      2. 만약 생성하려는 사례가 위 목록에 전혀 해당하지 않는 새로운 부자재(예: 벨크로, 테이프 등)라면 새로운 명칭을 'trimType'에 입력하십시오.
      3. 'severity'는 반드시 'Low', 'Medium', 'High' 중 하나여야 합니다.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caseId: { type: Type.STRING },
            trimType: { type: Type.STRING, description: "부자재의 종류 (기존 카테고리와 일치시키거나 새로운 아이템명)" },
            claimType: { type: Type.STRING, description: "사고의 제목/유형" },
            rca: { type: Type.STRING, description: "근본 원인 분석" },
            standards: { type: Type.STRING, description: "관련 품질 표준" },
            severity: { type: Type.STRING, description: "위험 수준: Low, Medium, High" },
            prevention: { type: Type.STRING, description: "예방 대책" }
          },
          required: ["caseId", "trimType", "claimType", "rca", "standards", "severity", "prevention"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}') as FailureCase;
  } catch (error) {
    console.error("Gemini JSON Error:", error);
    return null;
  }
};

export const predictApparelRisk = async (fabric: string, trim: string, process: string): Promise<RiskAnalysis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `당신은 의류 생산 리스크 관리 AI다. 사용자가 제공한 원단, 부자재, 가공 방식의 조합을 바탕으로 잠재적 클레임을 예측하고 리스크 분석 보고서를 작성해라.
      
      [입력 정보]
      원단 종류: ${fabric}
      부자재 종류: ${trim}
      후가공 방식: ${process}
      
      [보고서 구조]
      1. Risk Level: Low, Medium, High, Critical 중 선택.
      2. Predicted Failure: 발생 가능한 구체적인 사고 명칭 (예: 버블링, 산화, 이염 등).
      3. Technical Reason: 왜 그런 사고가 발생하는지 섬유공학적/화학적 근거 설명.
      4. Prevention Checklist: 사고 방지를 위해 생산 전 반드시 거쳐야 할 테스트 항목과 기준치 제시 (배열 형태).
      5. Expert Insight: 20년 차 매니저가 주는 실무 팁.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "Low, Medium, High, Critical" },
            predictedFailure: { type: Type.STRING },
            technicalReason: { type: Type.STRING },
            preventionChecklist: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            expertInsight: { type: Type.STRING }
          },
          required: ["riskLevel", "predictedFailure", "technicalReason", "preventionChecklist", "expertInsight"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}') as RiskAnalysis;
  } catch (error) {
    console.error("Risk Prediction Error:", error);
    return null;
  }
};
