"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/diagnosis", label: "진단" },
  { href: "/dashboard", label: "대시보드" },
  { href: "/roadmap", label: "로드맵" },
  { href: "/history", label: "히스토리" },
];

const serviceValues = [
  "성적, 관심사, 목표학교를 한 번에 보는 모바일 진단",
  "중학교부터 대입까지 이어지는 단계별 액션 로드맵",
  "시연 가능한 mock 데이터 기반 MVP",
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#e9eef5] text-slate-950 lg:grid lg:grid-cols-[minmax(360px,1fr)_430px] lg:items-center lg:gap-12 lg:px-12 lg:py-8 xl:px-20">
      <aside className="hidden lg:block">
        <div className="max-w-xl">
          <p className="text-sm font-black text-[#108469]">Teen-Fit MVP</p>
          <h1 className="mt-4 text-5xl font-black leading-tight tracking-normal text-slate-950">
            데이터로 증명하는 입시 러닝메이트
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            초등 고학년부터 중학생까지, 목표학교와 관심 진로를 기준으로
            지금 해야 할 학습 미션을 모바일 앱처럼 빠르게 확인합니다.
          </p>

          <div className="mt-8 grid gap-3">
            {serviceValues.map((value) => (
              <div
                key={value}
                className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200"
              >
                <span className="mt-1 size-2 rounded-full bg-[#18c29c]" />
                <p className="text-sm font-bold leading-6 text-slate-700">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-end gap-5">
            <div className="grid size-32 grid-cols-5 gap-1 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className={`rounded-sm ${
                    [0, 1, 2, 5, 10, 6, 12, 18, 20, 21, 22, 24].includes(index)
                      ? "bg-slate-950"
                      : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-black text-slate-500">배포 URL</p>
              <p className="mt-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
                teen-fit.vercel.app
              </p>
              <Link
                href="/onboarding"
                className="mt-4 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                데모 시작
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-frame no-scrollbar mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#f6f8fb] lg:h-[min(860px,calc(100vh-64px))] lg:min-h-0 lg:overflow-y-auto lg:rounded-[2rem] lg:shadow-2xl lg:ring-1 lg:ring-slate-200">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-5 py-3 backdrop-blur">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid size-9 place-items-center rounded-2xl bg-[#18c29c] text-white">
              T
            </span>
            <span>Teen-Fit</span>
          </Link>
        </header>

        <main className="grow pb-4">{children}</main>

        <nav className="sticky bottom-0 z-20 grid grid-cols-5 gap-1 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-1 py-2 text-center text-[11px] font-black transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function PageFrame({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-sm font-bold text-[#18a985]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal">
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function Notice() {
  return (
    <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
      틴핏의 분석은 실제 입시 합격 예측이 아니라 참고용 진로·학습 가이드입니다.
    </p>
  );
}
