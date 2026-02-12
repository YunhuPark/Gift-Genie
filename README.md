# 🎁 Gift Genie (센스쟁이)

> **고민 끝! AI가 찾아주는 완벽한 선물**  
> 대상, 상황, 예산만 입력하면 Gemini AI가 맞춤 선물 3가지를 추천합니다.

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Gemini-2.5_Flash-F4B400?logo=google&logoColor=white" alt="Gemini" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel" alt="Vercel" /></a>
</p>

<p align="center">
  <b>🌐 Live Demo →</b> <a href="https://gift-genie-gamma.vercel.app">gift-genie-gamma.vercel.app</a>
</p>

---

## ✨ Features

| 기능 | 설명 |
|------|------|
| 🤖 **AI 맞춤 추천** | Gemini 2.5 Flash가 대상·상황·예산을 분석하여 선물 3가지 추천 |
| 🎯 **프리셋 선택** | 관계 7종 + 상황 6종 버튼으로 원클릭 입력 |
| 🔄 **재추천** | 마음에 안 들면 같은 조건으로 즉시 다시 추천 |
| 💌 **카드 메시지** | AI가 생성한 감성 메시지 — 클립보드 복사 지원 |
| 🛍️ **즉시 검색** | 네이버 쇼핑 / 쿠팡에서 바로 검색 |
| 🎨 **다크 테마 UI** | Glassmorphism + Framer Motion 애니메이션 |
| 📱 **반응형** | 모바일 · 태블릿 · 데스크톱 완벽 대응 |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YunhuPark/Gift-Genie.git
cd Gift-Genie/gift-genie
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 [Google AI Studio](https://aistudio.google.com/apikey)에서 발급받은 API 키를 입력합니다.

```env
GEMINI_API_KEY=your_gemini_api_key_here

# 예산 범위 (선택)
NEXT_PUBLIC_MIN_BUDGET=5000
NEXT_PUBLIC_MAX_BUDGET=300000
```

### 3. 실행

```bash
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버
```

---

## 🎯 사용 흐름

```
랜딩 페이지 → 프리셋 선택 or 직접 입력 → AI 분석 중... → 결과 확인 → 네이버/쿠팡 검색
                                                              ↓
                                                        마음에 안 들면?
                                                           ↓
                                                      🔄 다시 추천받기
```

1. **랜딩 페이지** — 서비스 소개 + "선물 찾기 시작" 버튼
2. **입력 폼** — 프리셋 버튼(관계 7종·상황 6종) 또는 직접 타이핑 + 예산 슬라이더
3. **로딩** — 수정구슬 애니메이션 + 단계별 진행 표시
4. **결과** — 카드 플립으로 3가지 선물 공개 (선물명·가격·추천 이유·카드 메시지)
5. **액션** — 메시지 복사 / 네이버·쿠팡 검색 / ♻️ 다시 추천받기

---

## 📦 Tech Stack

| 영역 | 기술 |
|------|------|
| **Framework** | Next.js 16.1 (App Router) |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS v4 |
| **AI** | Google Gemini 2.5 Flash (자동 폴백 체인) |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

### AI 모델 폴백 체인

API 할당량 초과 시 자동으로 다음 모델을 시도합니다:

```
gemini-2.5-flash → gemini-2.0-flash-lite → gemini-2.0-flash
```

---

## 📁 프로젝트 구조

```
gift-genie/
├── app/
│   ├── api/recommend/route.ts     # Gemini API 엔드포인트 (폴백 체인)
│   ├── globals.css                # 글로벌 스타일 (다크 테마, Glassmorphism)
│   ├── layout.tsx                 # 루트 레이아웃 (Pretendard 폰트)
│   ├── page.tsx                   # 메인 페이지
│   └── error.tsx                  # 에러 바운더리
├── components/
│   ├── NavHeader.tsx              # 네비게이션 헤더 (AI 상태 표시)
│   ├── GiftGenieHero.tsx          # 랜딩 히어로 + 페이지 전환
│   ├── GiftInputForm.tsx          # 입력 폼 (프리셋 + 직접 입력)
│   └── GiftResults.tsx            # 결과 카드 (플립 애니메이션)
├── lib/
│   └── motion-config.ts           # 모션 감소 설정
├── .env.local                     # 환경변수 (Git 제외)
└── package.json
```

---

## 📊 API

### `POST /api/recommend`

**Request:**
```json
{
  "target": "30대 여자친구",
  "situation": "생일 축하",
  "budget": 100000
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": 1,
      "name": "프리미엄 스킨케어 세트",
      "reason": "고급스러운 패키지와 실용성을 겸비한 선물입니다.",
      "price": "₩75,000",
      "cardMessage": "생일 진심으로 축하해! 항상 빛나는 하루 되길 💕",
      "emoji": "🎁"
    }
  ]
}
```

> 💡 AI 실패 시 자동으로 폴백 추천(예산 비율 기반)이 제공됩니다.

---

## 🐛 Troubleshooting

| 문제 | 해결 방법 |
|------|----------|
| 흰 화면 | `Ctrl + Shift + R` 강력 새로고침 또는 `.next` 폴더 삭제 후 재시작 |
| API 에러 | `.env.local`에 `GEMINI_API_KEY` 확인 → [quota 확인](https://aistudio.google.com/apikey) |
| 포트 충돌 | `npx kill-port 3000` 후 재시작 |
| 같은 추천 반복 | API 할당량 초과 → 폴백 모드. 24시간 후 자동 리셋 |

---

## 🚢 배포

Vercel에 배포된 상태입니다. 재배포가 필요하면:

```bash
npx vercel --prod
```

> ⚠️ Vercel 대시보드에서 `GEMINI_API_KEY` 환경변수가 설정되어 있어야 합니다.

---

## 📝 License

MIT — 개인 및 상업적 사용 가능

---

<p align="center">
  <b>Made with ❤️ by Gift Genie</b><br/>
  🎁 Happy Gift Giving!
</p>
