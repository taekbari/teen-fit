"use client";

import { useState } from "react";

export function WrongAnswerDemo() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setDone(false);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 700);
  }

  return (
    <div className="grid gap-5">
      <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-300 bg-white p-6 text-center shadow-sm transition hover:border-[#18c29c]">
        <span className="text-5xl">📷</span>
        <span className="mt-4 text-xl font-black">문제 이미지 업로드</span>
        <span className="mt-2 text-sm leading-6 text-slate-500">
          실제 OCR은 연결하지 않고 mock 결과를 보여주는 데모입니다.
        </span>
        <input type="file" accept="image/*" className="sr-only" onChange={onUpload} />
      </label>

      <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-bold text-slate-500">업로드 파일</p>
        <h2 className="mt-2 text-2xl font-black">{fileName || "아직 업로드 전"}</h2>
        {loading ? (
          <p className="mt-6 rounded-2xl bg-slate-50 p-4 font-bold text-slate-600">
            오답 패턴을 읽는 중...
          </p>
        ) : null}
        {done ? (
          <div className="mt-6 grid gap-4">
            <ResultBlock title="mock 분석" text="이 문제는 함수 대입법 개념이 핵심이에요." />
            <ResultBlock title="관련 개념" text="함수값, 변수 대입, 식 정리, 좌표 해석" />
            <ResultBlock title="추천 복습 미션" text="함수 대입 문제 5개를 풀고, 틀린 식 변형을 한 줄로 설명해요." />
            <ResultBlock title="시바쌤 한마디" text="식을 무서워하지 말고 숫자를 하나씩 넣어봐. 길이 바로 보여!" />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function ResultBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase text-[#18a985]">{title}</p>
      <p className="mt-2 leading-7 text-slate-700">{text}</p>
    </div>
  );
}
