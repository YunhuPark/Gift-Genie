# 🚀 Gift Genie Setup Guide

## ⚡ 5분 만에 시작하기

### Step 1: Gemini API Key 발급 (무료)

1. **Google AI Studio 접속**:
   https://aistudio.google.com/app/apikey

2. **API Key 생성**:
   - "Create API Key" 클릭
   - 기존 Google Cloud 프로젝트 선택 또는 신규 생성
   - API Key 복사

3. **무료 티어 한도**:
   - **60 requests/minute** (분당 60회 요청)
   - **1,500 requests/day** (일일 1,500회 요청)
   - 초기 서비스 운영에 충분

### Step 2: 환경 변수 설정

\`\`\`bash
cd gift-genie
\`\`\`

**.env.local 파일 편집**:
\`\`\`env
GEMINI_API_KEY=여기에_발급받은_API_키_붙여넣기

# 예산 범위 (선택사항)
NEXT_PUBLIC_MIN_BUDGET=5000
NEXT_PUBLIC_MAX_BUDGET=300000
\`\`\`

### Step 3: 실행

\`\`\`bash
npm run dev
\`\`\`

🌐 **http://localhost:3000** 또는 **http://localhost:3001** 접속

---

## 🧪 테스트 시나리오

### 시나리오 1: 직장 상사 선물
- **대상**: 50대 남자 팀장님
- **상황**: 승진 축하, 부담스럽지 않게
- **예산**: ₩50,000

### 시나리오 2: 여자친구 생일
- **대상**: 20대 여자친구
- **상황**: 생일 축하, 로맨틱하게
- **예산**: ₩100,000

### 시나리오 3: 부모님 선물
- **대상**: 60대 부모님
- **상황**: 감사의 마음
- **예산**: ₩200,000

---

## ⚠️ 주의사항

### 1. API Key 보안
- **.env.local은 절대 Git에 커밋하지 마세요**
- Public Repository에 업로드 금지
- 유출 시 즉시 재발급

### 2. 무료 한도 관리
- 개발 중에는 충분하지만 프로덕션 전 모니터링 필수
- 한도 초과 시 fallback 추천 자동 제공

### 3. CORS 이슈
- API는 서버 사이드에서만 호출 (클라이언트 노출 방지)
- \`/api/recommend\` 엔드포인트 사용

---

## 📦 배포 (Vercel)

### 1. GitHub Push
\`\`\`bash
git init
git add .
git commit -m "feat: Gift Genie MVP"
git push origin main
\`\`\`

### 2. Vercel 연결
1. https://vercel.com 로그인
2. "Import Project" → GitHub 저장소 선택
3. Environment Variables 추가:
   - \`GEMINI_API_KEY\`
   - \`NEXT_PUBLIC_MIN_BUDGET\`
   - \`NEXT_PUBLIC_MAX_BUDGET\`
4. Deploy 클릭

### 3. 배포 완료
- 자동 HTTPS 설정
- 글로벌 CDN
- 자동 재배포 (git push 시)

---

## 🔧 개발 모드

### 디버깅
\`\`\`bash
# 빌드 에러 확인
npm run build

# 타입 체크
npx tsc --noEmit

# 린트
npm run lint
\`\`\`

### Hot Reload
- 코드 수정 시 자동 새로고침
- API 변경 시 브라우저 수동 새로고침 권장

### 로컬 테스트
- \`/test\` 페이지로 Next.js 작동 확인
- 브라우저 개발자 도구 Console 탭 확인

---

## 📞 문제 해결

### "Port 3000 is in use"
→ 자동으로 3001 포트 사용 (정상)

### "API key not configured"
→ `.env.local` 파일 확인 및 서버 재시작

### "Fallback recommendations shown"
→ Gemini API 응답 실패 (한도 초과 또는 네트워크 이슈)

---

**준비 완료! 이제 선물 추천을 시작하세요 🎁**
