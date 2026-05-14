import Link from "next/link";

export default function StudentHomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
      <section className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
          Student
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-950">학생 화면 placeholder</h1>
        <p className="mt-4 leading-7 text-slate-600">
          학생용 진단, 검사, 로드맵 확인 화면은 이후 단계에서 구현할 수 있도록 라우트만
          준비했습니다.
        </p>
        <Link
          href="/teacher"
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 font-black text-white"
        >
          선생님 화면으로 이동
        </Link>
      </section>
    </main>
  );
}
