import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center">
        <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
          Career Roadmap Report
        </p>
        <h1 className="mt-5 text-5xl font-black leading-tight tracking-normal">
          Future Fit
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
      </section>
    </main>
  );
}
