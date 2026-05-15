import Link from "next/link";

const coreValues = [
  "단발성 진로검사가 아니라 누적 성장 데이터 관리",
  "AI 분석 결과를 선생님이 상담에 활용",
  "학부모/학생에게 구체적인 액션 플랜 제공",
  "진로 방향 변경 시 새로운 진학 방향 제안",
  "고교학점제와 연계된 과목 추천",
  "학교별 시험 특징과 학사 일정 등 선생님 인사이트 포함",
];

const serviceFlow = [
  "초기 진단",
  "목표 설정",
  "월간 루프",
  "AI 분석",
  "로드맵 생성",
  "상담용 분석지",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Career Roadmap Report
        </p>
        <h1 className="mt-5 text-5xl font-black leading-tight tracking-normal">
          선생님 상담용 진로·진학 로드맵 결과지
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          학생의 성향검사, 진단검사, 진로 변화 데이터를 누적 관리하고, AI 분석과
          선생님 상담을 결합해 학부모/학생에게 구체적인 진로·진학 로드맵을 제공합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/student"
            className="rounded-2xl bg-white px-5 py-3 font-black text-slate-950"
          >
            학생 화면 보기
          </Link>
          <Link
            href="/teacher"
            className="rounded-2xl border border-white/20 px-5 py-3 font-black text-white"
          >
            선생님 화면 보기
          </Link>
        </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-black">핵심 가치</h2>
            <div className="mt-4 grid gap-3">
              {coreValues.map((value) => (
                <p key={value} className="rounded-2xl bg-white/5 p-3 text-sm font-bold text-slate-200">
                  {value}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-black">서비스 흐름</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceFlow.map((step, index) => (
                <span key={step} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-950">
                  {index + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
