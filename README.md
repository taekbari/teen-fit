# Teen-Fit

초등 고학년부터 중학생을 위한 AI 진로·입시 러닝메이트 MVP입니다. 현재 OpenAI API는 호출하지 않고 mock 분석 결과로 동작하며, 추후 서버 라우트에서 AI 호출로 교체할 수 있게 구조를 분리했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

프로덕션 빌드 확인:

```bash
npm run build
```

이 프로젝트는 Node.js `22` 이상을 기준으로 실행합니다. `package.json`의 `engines`와 `.nvmrc`에 로컬/배포 런타임 요구사항을 명시했습니다.

## 주요 페이지

- `/` 랜딩 페이지
- `/onboarding` 학생 프로필 입력
- `/diagnosis` 내신 점수와 학습 성향 진단
- `/dashboard` 목표학교 달성도와 추천 미션
- `/roadmap` 중학교부터 대학교까지의 로드맵
- `/wrong-answer` 오답스캔 mock 데모
- `/history` localStorage 기반 진단 히스토리

## API 구조

- `app/api/analyze/route.ts`: 분석 API Route Handler
- `lib/analyze.ts`: `analyzeWithMock`, `analyzeWithAI`, `analyzeStudent` 분리
- `lib/mockData.ts`: 템플릿 학생, 진단, 분석, 로드맵 데이터
- `types/index.ts`: `StudentProfile`, `DiagnosisInput`, `AnalysisResult`, `Quest`, `RoadmapStep`, `Character`

`.env.local.example`을 참고해 나중에 서버 전용 OpenAI 키를 추가할 수 있습니다.

```bash
OPENAI_API_KEY=
ENABLE_OPENAI_ANALYSIS=false
```

API Key는 클라이언트 코드에서 읽지 않고 서버 라우트와 `lib/analyze.ts`에서만 사용하도록 설계되어 있습니다.

## Vercel 배포

### Vercel CLI로 배포

```bash
npm i -g vercel
vercel
```

첫 배포 후 프로덕션 배포가 필요하면 다음 명령을 사용합니다.

```bash
vercel --prod
```

Vercel 프로젝트 설정에서 환경변수를 추가할 수 있습니다.

- `OPENAI_API_KEY`: 현재 mock 모드에서는 비워둬도 됩니다.
- `ENABLE_OPENAI_ANALYSIS`: 현재는 `false` 권장

### GitHub 연결 자동 배포

1. GitHub에 이 프로젝트를 push합니다.
2. Vercel 대시보드에서 `Add New Project`를 선택합니다.
3. GitHub 저장소를 import합니다.
4. Framework Preset은 `Next.js`로 둡니다.
5. Build Command는 `npm run build`, Install Command는 `npm install`을 사용합니다.
6. 필요한 환경변수를 Vercel Project Settings의 Environment Variables에 등록합니다.
7. main 브랜치에 push하면 자동으로 배포됩니다.

이 프로젝트는 demo/mock 데이터만으로 `/onboarding`, `/diagnosis`, `/dashboard`, `/roadmap`, `/wrong-answer`, `/history`를 바로 시연할 수 있습니다. 정적 asset은 App Router 기본 경로와 `/favicon.ico`를 사용해 Vercel 배포 경로에서도 별도 설정이 필요 없습니다.

## 안내

틴핏의 분석은 실제 입시 합격 예측이 아니라 참고용 진로·학습 가이드입니다.
