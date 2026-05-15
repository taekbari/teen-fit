"use client";

import { useState } from "react";
import type { FitLevel, SchoolFit } from "@/types/studentReport";

type CounselingMemo = {
  id: string;
  content: string;
  createdAt: string;
};

export function SchoolFitCard({ school }: { school: SchoolFit }) {
  const [draft, setDraft] = useState("");
  const [memos, setMemos] = useState<CounselingMemo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState("");

  function addMemo() {
    const content = draft.trim();
    if (!content) return;

    setMemos((current) => [
      {
        id: `${school.id}-${Date.now()}`,
        content,
        createdAt: new Date().toLocaleDateString("ko-KR", {
          month: "short",
          day: "numeric",
        }),
      },
      ...current,
    ]);
    setDraft("");
  }

  function startEditing(memo: CounselingMemo) {
    setEditingId(memo.id);
    setEditingDraft(memo.content);
  }

  function saveMemo(id: string) {
    const content = editingDraft.trim();
    if (!content) return;

    setMemos((current) => current.map((memo) => memo.id === id ? { ...memo, content } : memo));
    setEditingId(null);
    setEditingDraft("");
  }

  function deleteMemo(id: string) {
    setMemos((current) => current.filter((memo) => memo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingDraft("");
    }
  }

  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-slate-400">배정 가능 학교</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{school.name}</h3>
        </div>
        <FitBadge level={school.fitLevel} />
      </div>

      <Highlight label="추천 포인트" value={school.recommendationPoint} />

      <InfoBlock label="주요 특징" value={school.mainFeature} />
      <InfoBlock label="출제/평가 경향" value={school.assessmentTrend} />
      <InfoBlock label="수아 학생을 위한 전략" value={school.studentStrategy} strong />

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
        <label className="grid gap-2">
          <span className="text-xs font-black text-slate-600">상담 메모</span>
          <textarea
            className="min-h-24 resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-800 outline-none transition focus:border-slate-950"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={school.counselingMemoPlaceholder}
          />
        </label>
        <button
          type="button"
          className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!draft.trim()}
          onClick={addMemo}
        >
          메모 추가
        </button>

        <div className="grid gap-2">
          {memos.length ? (
            memos.map((memo) => (
              <div key={memo.id} className="rounded-xl border border-slate-200 bg-white p-3">
                {editingId === memo.id ? (
                  <div className="grid gap-2">
                    <textarea
                      className="min-h-20 resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold leading-6 text-slate-800 outline-none focus:border-slate-950"
                      value={editingDraft}
                      onChange={(event) => setEditingDraft(event.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                        onClick={() => {
                          setEditingId(null);
                          setEditingDraft("");
                        }}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                        disabled={!editingDraft.trim()}
                        onClick={() => saveMemo(memo.id)}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold leading-6 text-slate-700">{memo.content}</p>
                      <span className="shrink-0 text-xs font-black text-slate-400">{memo.createdAt}</span>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                        onClick={() => startEditing(memo)}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-black text-rose-600"
                        onClick={() => deleteMemo(memo.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 bg-white px-3 py-4 text-center text-xs font-bold text-slate-400">
              추가된 상담 메모가 없습니다.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function FitBadge({ level }: { level: FitLevel }) {
  const label = {
    high: "높음",
    medium: "보통",
    needs_preparation: "대비 필요",
  }[level];

  const className = {
    high: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    medium: "bg-sky-50 text-sky-700 ring-sky-100",
    needs_preparation: "bg-amber-50 text-amber-700 ring-amber-100",
  }[level];

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ring-1 ${className}`}>
      {label}
    </span>
  );
}

function Highlight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4 text-white">
      <p className="text-xs font-black text-emerald-300">{label}</p>
      <p className="mt-1 text-sm font-black leading-6">{value}</p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-black text-slate-500">{label}</p>
      <p className={`mt-1 text-sm leading-6 ${strong ? "font-bold text-slate-900" : "text-slate-600"}`}>
        {value}
      </p>
    </div>
  );
}
