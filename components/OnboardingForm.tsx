"use client";

import { templateProfile } from "@/lib/mockData";
import { saveProfile } from "@/lib/storage";
import type { Character, StudentProfile } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const characters: Character[] = ["시바쌤", "냥쌤", "토끼쌤"];

export function OnboardingForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>(templateProfile);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof StudentProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.name.trim() || !profile.grade.trim() || !profile.targetSchool.trim()) {
      setError("이름, 학년, 목표학교는 꼭 입력해 주세요.");
      return;
    }

    setLoading(true);
    saveProfile(profile);
    window.setTimeout(() => router.push("/diagnosis"), 350);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {[
        ["name", "이름"],
        ["grade", "학년"],
        ["gender", "성별"],
        ["school", "학교"],
        ["targetSchool", "목표학교"],
        ["careerInterest", "관심 진로/분야"],
        ["favoriteActivities", "좋아하는 활동"],
      ].map(([field, label]) => (
        <label key={field}>
          <span className="text-sm font-bold text-slate-600">{label}</span>
          <input
            value={profile[field as keyof StudentProfile]}
            onChange={(event) => update(field as keyof StudentProfile, event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#18c29c] focus:bg-white"
          />
        </label>
      ))}

      <div>
        <p className="text-sm font-bold text-slate-600">캐릭터 선택</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {characters.map((character) => (
            <button
              type="button"
              key={character}
              onClick={() => setProfile((current) => ({ ...current, character }))}
              className={`rounded-2xl border px-3 py-4 text-left text-sm font-bold transition ${
                profile.character === character
                  ? "border-[#18c29c] bg-[#e8fff8] text-[#108469]"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {character === "시바쌤" ? "🐶" : character === "냥쌤" ? "🐱" : "🐰"} {character}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="text-sm font-bold text-red-500">{error}</p> : null}
      <button
        disabled={loading}
        className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? "저장 중..." : "진단하러 가기"}
      </button>
    </form>
  );
}
