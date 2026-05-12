import { Notice } from "@/components/AppShell";
import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-sm font-black text-[#18a985]">Teen-Fit</p>
        <h1 className="mt-4 text-4xl font-black tracking-normal text-slate-950 sm:text-6xl">
          데이터로 증명하는 힙한 입시 러닝메이트
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          성적과 관심사의 변화에 따라 목표학교까지의 거리를 보여드려요.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="rounded-2xl bg-slate-950 px-6 py-4 text-center font-black text-white transition hover:bg-slate-800"
          >
            시작하기
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center font-black text-slate-900 transition hover:bg-slate-50"
          >
            템플릿 대시보드 보기
          </Link>
        </div>
        <div className="mt-8 max-w-xl">
          <Notice />
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="rounded-[1.5rem] bg-[#e8fff8] p-5">
          <div className="flex items-center justify-between">
            <span className="font-black text-[#108469]">과학고 달성도</span>
            <span className="text-3xl font-black">68%</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[68%] rounded-full bg-[#18c29c]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["문해력", "82"],
            ["수리력", "65"],
            ["탐구력", "92"],
            ["자기관리력", "74"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 rounded-3xl bg-slate-950 p-4 text-white">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">
            🐶
          </div>
          <p className="text-sm leading-6 text-slate-100">
            탐구력은 이미 반짝이고 있어! 이제 수리력만 조금 더 키우면 목표가 가까워져.
          </p>
        </div>
      </div>
    </section>
  );
}
