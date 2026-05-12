"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/onboarding", label: "온보딩" },
  { href: "/diagnosis", label: "진단" },
  { href: "/dashboard", label: "대시보드" },
  { href: "/roadmap", label: "로드맵" },
  { href: "/wrong-answer", label: "오답스캔" },
  { href: "/history", label: "히스토리" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid size-9 place-items-center rounded-2xl bg-[#18c29c] text-white">
              T
            </span>
            <span>Teen-Fit</span>
          </Link>
          <nav className="no-scrollbar flex max-w-[70vw] gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
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
      </header>
      <main>{children}</main>
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
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-[#18a985]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
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
