"use client";

import { templateAnalysis, templateDiagnosis, templateProfile } from "@/lib/mockData";
import type { AnalysisResult, DiagnosisInput, HistoryEntry, StudentProfile } from "@/types";

const PROFILE_KEY = "teen-fit:profile";
const DIAGNOSIS_KEY = "teen-fit:diagnosis";
const ANALYSIS_KEY = "teen-fit:analysis";
const HISTORY_KEY = "teen-fit:history";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile() {
  return readJson<StudentProfile>(PROFILE_KEY, templateProfile);
}

export function saveProfile(profile: StudentProfile) {
  writeJson(PROFILE_KEY, profile);
}

export function getDiagnosis() {
  return readJson<DiagnosisInput>(DIAGNOSIS_KEY, templateDiagnosis);
}

export function saveDiagnosis(diagnosis: DiagnosisInput) {
  writeJson(DIAGNOSIS_KEY, diagnosis);
}

export function getAnalysis() {
  return readJson<AnalysisResult>(ANALYSIS_KEY, templateAnalysis);
}

export function saveAnalysis(analysis: AnalysisResult) {
  writeJson(ANALYSIS_KEY, analysis);
}

export function getHistory() {
  return readJson<HistoryEntry[]>(HISTORY_KEY, []);
}

export function addHistory(entry: HistoryEntry) {
  const next = [entry, ...getHistory()].slice(0, 12);
  writeJson(HISTORY_KEY, next);
}
