# 🎁 Gift Genie (센스쟁이)

> AI 기반 선물 추천 서비스 - 고민 끝! AI가 찾아주는 완벽한 선물

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-orange)](https://ai.google.dev/)

## ✨ Features

- 🤖 **AI 맞춤 추천**: Gemini 1.5 Flash 기반 개인화된 선물 추천
- 🎨 **화려한 UI/UX**: Glassmorphism + Framer Motion 애니메이션
- 💌 **카드 메시지**: 감성적인 메시지 생성 및 복사 기능
- 🛍️ **즉시 구매**: 네이버 쇼핑 최저가 검색 연동
- ♿ **접근성**: 저사양 기기 및 모션 민감성 사용자 지원
- 📱 **반응형**: 모바일부터 데스크톱까지 완벽 대응

## 🚀 Quick Start

### 1. Clone & Install

\`\`\`bash
cd gift-genie
npm install
\`\`\`

### 2. Environment Setup

\`\`\`bash
# .env.local 파일 생성
cp .env.local.example .env.local
\`\`\`

**.env.local 설정:**

\`\`\`env
# Gemini API Key 발급: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 3. Development Server

\`\`\`bash
npm run dev
\`\`\`

🌐 Open http://localhost:3000

### 4. Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 📦 Tech Stack

### Core
- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4

### AI & APIs
- **AI Provider**: Google Gemini 1.5 Flash (무료 티어)
- **Search Integration**: Naver Shopping

### UI/UX
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Design**: Glassmorphism + Gradient

## 📁 Project Structure

\`\`\`
gift-genie/
├── app/
│   ├── api/
│   │   └── recommend/route.ts    # Gemini API 엔드포인트
│   ├── globals.css               # 글로벌 스타일 (Glassmorphism)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 페이지
│   └── error.tsx                 # 에러 바운더리
├── components/
│   ├── GiftGenieHero.tsx         # 랜딩 페이지 + CTA
│   ├── GiftInputForm.tsx         # 입력 폼 (대상/상황/예산)
│   └── GiftResults.tsx           # 결과 카드 (타로 카드 플립)
├── lib/
│   └── motion-config.ts          # 모션 감소 설정
└── .env.local                    # 환경 변수
\`\`\`

## 🎯 User Flow

1. **랜딩 페이지**: 서비스 소개 + "선물 찾기 시작" CTA
2. **입력 폼**:
   - 대상: "30대 여자 친구"
   - 상황: "생일 축하, 부담스럽지 않게"
   - 예산: ₩5,000 ~ ₩300,000 (슬라이더)
3. **로딩 상태**: 마법의 수정구슬 애니메이션
4. **결과 화면**: 타로 카드 플립으로 3가지 선물 공개
   - 선물명, 가격, 추천 이유
   - 카드 메시지 (복사 기능)
   - 최저가 검색 버튼 (네이버 쇼핑)

## ⚙️ Configuration

### Budget Range

\`.env.local\`:
\`\`\`env
NEXT_PUBLIC_MIN_BUDGET=5000      # 최소 예산
NEXT_PUBLIC_MAX_BUDGET=300000    # 최대 예산
\`\`\`

### AI Model

\`app/api/recommend/route.ts\`:
\`\`\`typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"  # 무료 티어
});
\`\`\`

## 📊 API Usage

### Request
\`\`\`typescript
POST /api/recommend
{
  "target": "30대 남자 직장상사",
  "situation": "승진 축하, 부담스럽지 않게",
  "budget": 50000
}
\`\`\`

### Response
\`\`\`typescript
{
  "recommendations": [
    {
      "id": 1,
      "name": "프리미엄 텀블러 세트",
      "reason": "매일 사용하는 실용적인 아이템...",
      "price": "₩45,000",
      "cardMessage": "늘 건강하시고 행복한 하루 되세요! 🌟",
      "emoji": "☕"
    }
    // ... 2 more
  ]
}
\`\`\`

## 🐛 Troubleshooting

### White Screen
1. Check dev server port (localhost:3000 or 3001)
2. Hard refresh: \`Ctrl + Shift + R\`
3. Clear cache: \`rm -rf .next && npm run dev\`

### API Error
1. Verify \`GEMINI_API_KEY\` in \`.env.local\`
2. Check quota: https://aistudio.google.com/app/apikey
3. Fallback recommendations shown automatically

## 📝 License

MIT - Free for personal and commercial use

---

**Made with ❤️ by Gift Genie**

🎁 Happy Gift Giving!
