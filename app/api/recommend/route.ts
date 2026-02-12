import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Types
interface RecommendationRequest {
  target: string;
  situation: string;
  budget: number;
}

interface GiftRecommendation {
  id: number;
  name: string;
  reason: string;
  price: string;
  cardMessage: string;
  emoji: string;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Models to try in order (fallback chain)
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
];

async function tryGenerateWithModels(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  for (const modelName of MODELS) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(`Success with model: ${modelName}`);
      return text;
    } catch (error: any) {
      console.error(`Model ${modelName} failed:`, error.message?.substring(0, 100));
      lastError = error;

      // If it's a 429 (rate limit), try next model
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        continue;
      }
      // For other errors (e.g. auth), throw immediately
      throw error;
    }
  }

  throw lastError || new Error("All models failed");
}

export async function POST(request: NextRequest) {
  // Parse request body ONCE
  let body: RecommendationRequest = {
    target: "선물 대상",
    situation: "특별한 날",
    budget: 50000,
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const { target, situation, budget } = body;

  // Validation
  if (!target || !situation || !budget) {
    return NextResponse.json(
      { error: "Missing required fields: target, situation, budget" },
      { status: 400 }
    );
  }

  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not configured");
    const fallback = generateFallbackRecommendations(target, situation, budget);
    return NextResponse.json({
      recommendations: fallback,
      fallback: true,
      message: "API 키가 설정되지 않았습니다.",
    });
  }

  try {
    // Construct prompt for Gemini
    const prompt = `당신은 센스있는 선물 추천 전문가입니다. 다음 정보를 바탕으로 3가지 선물을 추천해주세요.

**입력 정보:**
- 선물 대상: ${target}
- 상황: ${situation}
- 예산: ${budget.toLocaleString()}원

**출력 형식 (JSON):**
반드시 아래 JSON 배열 형식으로 정확히 3개의 선물을 추천하세요. 다른 설명 없이 JSON만 출력하세요.

[
  {
    "id": 1,
    "name": "선물 이름",
    "reason": "추천 이유 (감성적이고 설득력 있게 1-2문장)",
    "price": "₩XX,000",
    "cardMessage": "선물과 함께 전할 감성적인 메시지 (이모지 포함, 1-2문장)",
    "emoji": "선물을 대표하는 이모지 1개"
  }
]

**주의사항:**
1. 예산 범위 내에서 현실적인 가격 제시 (각 선물마다 다른 가격)
2. 대상의 연령/성별/관계를 고려
3. 상황에 맞는 적절한 선물
4. cardMessage는 받는 사람 입장에서 감동받을 만한 내용
5. 각 선물은 서로 다른 카테고리여야 함 (중복 금지)
6. 가격은 반드시 "₩" 기호와 천 단위 콤마를 포함

JSON만 출력하세요:`;

    // Try multiple models with fallback
    const text = await tryGenerateWithModels(prompt);

    // Parse JSON from response
    let recommendations: GiftRecommendation[];
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      recommendations = JSON.parse(jsonText);

      // Validate structure
      if (!Array.isArray(recommendations) || recommendations.length !== 3) {
        throw new Error("Invalid recommendations format");
      }

      // Ensure all required fields exist
      recommendations.forEach((rec, index) => {
        if (!rec.name || !rec.reason || !rec.price || !rec.cardMessage || !rec.emoji) {
          throw new Error(`Missing fields in recommendation ${index + 1}`);
        }
        rec.id = index + 1;
      });
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      recommendations = generateFallbackRecommendations(target, situation, budget);
    }

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error("API Error:", error.message?.substring(0, 200));

    const fallback = generateFallbackRecommendations(target, situation, budget);

    return NextResponse.json({
      recommendations: fallback,
      fallback: true,
      message: "AI 추천 생성 중 문제가 발생했습니다. 기본 추천을 제공합니다.",
    });
  }
}

// Fallback recommendations generator
function generateFallbackRecommendations(
  target: string,
  situation: string,
  budget: number
): GiftRecommendation[] {
  const price1 = Math.round((budget * 0.6) / 1000) * 1000;
  const price2 = Math.round((budget * 0.8) / 1000) * 1000;
  const price3 = Math.round((budget * 0.9) / 1000) * 1000;

  return [
    {
      id: 1,
      name: "프리미엄 텀블러 세트",
      reason: "매일 사용하는 실용적인 아이템으로, 센스있는 디자인이 돋보입니다.",
      price: `₩${price1.toLocaleString()}`,
      cardMessage: `${target}님께 늘 건강하시고 행복한 하루 되시길 바라며 🌟`,
      emoji: "☕",
    },
    {
      id: 2,
      name: "수제 초콜릿 선물세트",
      reason: "고급스러운 패키지와 달콤한 맛으로 특별한 날을 더욱 빛내줍니다.",
      price: `₩${price2.toLocaleString()}`,
      cardMessage: `${situation}을(를) 진심으로 축하드리며, 달콤한 하루 되세요 🍫`,
      emoji: "🍫",
    },
    {
      id: 3,
      name: "디퓨저 & 캔들 세트",
      reason: "은은한 향기로 일상에 여유를 선물하는 감성적인 아이템입니다.",
      price: `₩${price3.toLocaleString()}`,
      cardMessage: "편안한 휴식과 함께 향기로운 시간 보내시길 바랍니다 🕯️",
      emoji: "🕯️",
    },
  ];
}
