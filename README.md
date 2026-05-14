# 진로·진학 로드맵 결과지

선생님이 학부모/학생 상담 전에 확인하는 진로·진학 로드맵 결과지 서비스입니다.
현재는 실제 AI 호출 없이 mock/template 데이터만 사용합니다.

## 서비스 개요

학생의 성향검사, 진단검사, 진로 변화 데이터를 누적 관리하고, AI 분석과 선생님 상담을 결합해 진로/진학 로드맵을 제공하는 서비스입니다.

## 핵심 가치

- 단발성 진로검사가 아니라 누적 성장 데이터 관리
- AI 분석 결과를 선생님이 상담에 활용
- 학부모/학생에게 구체적인 액션 플랜 제공
- 진로 방향이 변경되면 새로운 진학 방향 제안
- 고교학점제와 연계된 과목 추천
- 학교별 시험 특징, 학사 일정 등 선생님 인사이트 포함

## 핵심 데이터

- 1년 단위 성향검사 변화
- 6개월 단위 진단평가 변화
- 국/영/수 성장 변화
- 진로 방향 변화 타임라인
- 관심 직업/전공/학교
- 학교 시험 및 수행평가 데이터
- 선생님 관찰 메모

## 서비스 흐름

1. 초기 진단
2. 목표 설정
3. 월간 루프(시험/미션/성장 입력)
4. AI 분석
5. 진로/진학 로드맵 생성
6. 선생님 상담용 분석지 제공

## 현재 우선 구현

- 선생님용 결과 화면
- mock/template 데이터 기반
- 실제 Claude API 호출 금지
- 나중에 Claude API 쉽게 연결 가능하도록 구조 설계

## 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 주요 라우트

- `/teacher`: 선생님 홈, 학생 목록, 최근 분석 상태
- `/teacher/students/STU-2401/report`: 선생님용 결과 화면
- `/teacher/students/STU-2402/report`: 선생님용 결과 화면
- `/student`: 학생 화면 placeholder
- `/api/ai/report`: mock report 반환 API

## 환경변수

`.env.local`을 만들고 다음 값을 설정합니다.

```bash
ANTHROPIC_API_KEY=
CLAUDE_MODEL=claude-sonnet-4-5-20250929
CLAUDE_API_VERSION=2023-06-01
CLAUDE_API_BASE_URL=https://api.anthropic.com/v1/messages
CLAUDE_MAX_TOKENS=4000
CLAUDE_TIMEOUT_MS=30000
ENABLE_AI_REPORT=false
```

Vercel 배포 시에는 Project Settings의 Environment Variables에 같은 값을 추가합니다.
API 키는 서버 전용 환경변수로만 사용해야 하므로 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.

## Claude API 준비 구조

실제 Claude API 호출은 현재 비활성화되어 있습니다. 다음 파일에 연결 지점만 준비되어 있습니다.

- `src/lib/ai/env.ts`
- `src/lib/ai/claudeClient.ts`
- `src/lib/ai/reportPrompt.ts`
- `src/lib/ai/generateReport.ts`
- `src/app/api/ai/report/route.ts`

현재 API 요청은 mock report만 반환합니다.
나중에 실제 호출을 켤 때는 `.env.local` 또는 Vercel 환경변수에서 `ANTHROPIC_API_KEY`를 설정하고 `ENABLE_AI_REPORT=true`로 변경한 뒤, `generateStudentReport` 내부 TODO 구간에서 Claude 응답 파싱/검증 로직을 연결하면 됩니다.

요청:

```json
{
  "studentId": "STU-2401"
}
```

응답:

```json
{
  "report": {
    "id": "REPORT-STU-2401",
    "studentId": "STU-2401"
  },
  "meta": {
    "source": "mock",
    "aiEnabled": false,
    "promptVersion": "teacher-report-v1",
    "generatedBy": "template",
    "warnings": []
  }
}
```
