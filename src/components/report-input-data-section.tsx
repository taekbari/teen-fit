"use client";

import { Card, formatDate, formatSchool } from "@/components/report-ui";
import type { SchoolLevel, StudentSummaryStatus } from "@/types/student";
import Link from "next/link";
import { useEffect, useState } from "react";

type TeacherStudentInput = {
  id: string;
  name: string;
  gender?: string;
  region?: string;
  schoolLevel: SchoolLevel;
  grade: number;
  school: string;
  latestCareerGoal: string;
  careerTrack?: string;
  personalityData?: string;
  diagnosisData?: string;
  nearbyMiddleSchools?: string[];
  studentCharacteristics?: string;
  schoolSpecialInfo?: string;
  schoolWebInfo?: string;
  lastAnalyzedAt: string;
  status: StudentSummaryStatus;
  latestMemo: string;
  hasReport: boolean;
  source: "mock" | "local";
};

const localStorageKey = "teen-fit.teacher.localStudents";
const editsStorageKey = "teen-fit.teacher.studentEdits";
const personalityStages = ["초등 6학년", "중학교 1학년", "중학교 2학년"] as const;
const personalityQualRows = ["주요 관심 과목", "학습 태도", "핵심 강점", "지도 핵심"] as const;

type PersonalityRecord = {
  period: string;
  qualitativeValue: string;
  quantitativeValue: string;
  quantitativeDetails: QuantitativeDetail[];
};
type QuantitativeDetail = {
  group: string;
  category: string;
  value: string;
};
type DiagnosisRecord = {
  period: string;
  korean: string;
  english: string;
  math: string;
  curriculumDetail: string;
  curriculumDetails: CurriculumDetail[];
};
type CurriculumDetail = {
  subject: string;
  category: string;
  value: string;
};
type TeacherNoteRecord = {
  category: string;
  content: string;
};
type SchoolSpecialInfoRecord = {
  schoolName: string;
  category: string;
  content: string;
};
type SchoolWebInfoRecord = {
  schoolName: string;
  type: string;
  content: string;
};

export function ReportSourceDataSection({ studentId }: { studentId: string }) {
  const [student, setStudent] = useState<TeacherStudentInput | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStudent(readStoredStudent(studentId));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [studentId]);

  if (!student || !hasReportInputData(student)) return null;

  return (
    <section className="mt-5">
      <Card
        title="리포트 기준 데이터"
        description="선생님 화면에서 입력한 성향검사와 진단검사 값을 결과지 기준 데이터로 확인합니다."
      >
        <ReportInputGrid student={student} />
      </Card>
    </section>
  );
}

export function StoredStudentReport({ studentId }: { studentId: string }) {
  const [student, setStudent] = useState<TeacherStudentInput | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStudent(readStoredStudent(studentId));
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [studentId]);

  if (!loaded) {
    return <main className="min-h-screen px-8 py-8" />;
  }

  if (!student) {
    return (
      <main className="min-h-screen px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
            <h1 className="text-3xl font-black text-slate-950">학생 결과지 데이터를 찾을 수 없습니다</h1>
            <p className="mt-3 leading-7 text-slate-600">
              선생님 화면에서 추가한 학생 데이터가 현재 브라우저에 저장되어 있지 않습니다.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/teacher" className="text-sm font-black text-slate-500">
            ← 학생 목록
          </Link>
          <p className="text-sm font-bold text-slate-400">
            입력 기준 {formatDate(student.lastAnalyzedAt)}
          </p>
        </div>

        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                Teacher Report
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-normal">{student.name} 결과지</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                선생님이 입력한 성향검사, 진단검사, 진로 방향, 학교 정보를 기준으로
                상담 전 확인용 결과지를 구성했습니다.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <InfoRow label="개인정보" value={`${student.gender || "-"} · ${formatSchool(student.schoolLevel, student.grade)}`} />
              <InfoRow label="거주 지역" value={student.region || "-"} />
              <InfoRow label="희망 진로" value={student.latestCareerGoal} />
              <InfoRow label="계열" value={student.careerTrack || "-"} />
            </div>
          </div>
        </section>

        <section className="mt-5">
          <Card title="리포트 기준 데이터">
            <ReportInputGrid student={student} />
          </Card>
        </section>
      </div>
    </main>
  );
}

function ReportInputGrid({ student }: { student: TeacherStudentInput }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PersonalityDataBlock value={student.personalityData} />
      <DiagnosisDataBlock value={student.diagnosisData} />
      <TeacherNoteDataBlock value={student.studentCharacteristics} />
      <SchoolSpecialInfoDataBlock value={student.schoolSpecialInfo} />
      <SchoolWebInfoDataBlock value={student.schoolWebInfo} />
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-black text-slate-500">학교 정보</p>
        <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
          <p>주변 중학교: {student.nearbyMiddleSchools?.join(", ") || "미입력"}</p>
          <p>관찰 메모: {student.latestMemo || "미입력"}</p>
        </div>
      </div>
    </div>
  );
}

function PersonalityDataBlock({ value }: { value?: string }) {
  const records = parsePersonalityRecords(value);

  if (!records) return <DataBlock title="성향검사결과 data" value={value} />;

  const qualitativeRecords = records.filter((record) => record.qualitativeValue);
  const quantitativeRows = records.flatMap((record) =>
    record.quantitativeDetails.length
      ? record.quantitativeDetails.map((detail) => ({ period: record.period, detail }))
      : record.quantitativeValue
        ? [{ period: record.period, detail: { group: "기존 입력", category: "수치 검사값", value: record.quantitativeValue } }]
        : [],
  );

  return (
    <div className="rounded-2xl bg-slate-50 p-4 lg:col-span-2">
      <p className="text-sm font-black text-slate-500">성향검사결과 data</p>
      <p className="mt-1 text-xs font-bold text-slate-500">
        선생님이 추가한 검사 학년별 정성 검사값과 수치 검사값입니다.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[180px_1fr] bg-slate-100 text-xs font-black text-slate-500">
              <div className="p-3">검사 시기</div>
              <div className="p-3">정성 검사값</div>
            </div>
            {qualitativeRecords.length ? (
              qualitativeRecords.map((record) => (
                <div
                  key={`qualitative-${record.period}`}
                  className="grid grid-cols-[180px_1fr] border-t border-slate-200 text-sm"
                >
                  <div className="bg-slate-50 p-3 font-black text-slate-600">{record.period || "-"}</div>
                  <div className="whitespace-pre-wrap p-3 leading-6 text-slate-700">
                    {record.qualitativeValue}
                  </div>
                </div>
              ))
            ) : (
              <div className="border-t border-slate-200 p-4 text-center text-sm font-bold text-slate-400">
                추가된 정성 검사값이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[180px_120px_1fr_100px] bg-slate-100 text-xs font-black text-slate-500">
              <div className="p-3">검사 시기</div>
              <div className="p-3">구분</div>
              <div className="p-3">상세항목</div>
              <div className="p-3 text-center">값</div>
            </div>
            {quantitativeRows.length ? (
              quantitativeRows.map(({ period, detail }) => (
                <div
                  key={`quantitative-${period}-${detail.group}-${detail.category}`}
                  className="grid grid-cols-[180px_120px_1fr_100px] border-t border-slate-200 text-sm"
                >
                  <div className="bg-slate-50 p-3 font-black text-slate-600">{period || "-"}</div>
                  <div className="p-3 text-slate-700">{detail.group}</div>
                  <div className="p-3 text-slate-700">{detail.category}</div>
                  <div className="p-3 text-center font-bold text-slate-700">{detail.value}</div>
                </div>
              ))
            ) : (
              <div className="border-t border-slate-200 p-4 text-center text-sm font-bold text-slate-400">
                추가된 수치 검사값이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosisDataBlock({ value }: { value?: string }) {
  const records = parseDiagnosisRecords(value);

  if (!records) return <DataBlock title="진단검사 결과 data" value={value} />;

  const scoreRecords = records.filter((record) => record.korean || record.english || record.math);
  const curriculumRows = records.flatMap((record) =>
    record.curriculumDetails.length
      ? record.curriculumDetails.map((detail) => ({ period: record.period, detail }))
      : record.curriculumDetail
        ? [{ period: record.period, detail: { subject: "공통", category: "세부 분류", value: record.curriculumDetail } }]
        : [],
  );

  return (
    <div className="rounded-2xl bg-slate-50 p-4 lg:col-span-2">
      <p className="text-sm font-black text-slate-500">진단검사 결과 data</p>
      <p className="mt-1 text-xs font-bold text-slate-500">
        선생님이 추가한 검사 시기별 총점과 세부 분류입니다.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[180px_repeat(3,80px)] bg-slate-100 text-xs font-black text-slate-500">
              <div className="p-3">검사 시기</div>
              <div className="p-3 text-center">국어</div>
              <div className="p-3 text-center">영어</div>
              <div className="p-3 text-center">수학</div>
            </div>
            {scoreRecords.length ? (
              scoreRecords.map((record) => (
                <div
                  key={`scores-${record.period}`}
                  className="grid grid-cols-[180px_repeat(3,80px)] border-t border-slate-200 text-sm"
                >
                  <div className="bg-slate-50 p-3 font-black text-slate-600">{record.period || "-"}</div>
                  <div className="p-3 text-center font-bold text-slate-700">{record.korean || "-"}</div>
                  <div className="p-3 text-center font-bold text-slate-700">{record.english || "-"}</div>
                  <div className="p-3 text-center font-bold text-slate-700">{record.math || "-"}</div>
                </div>
              ))
            ) : (
              <div className="border-t border-slate-200 p-4 text-center text-sm font-bold text-slate-400">
                추가된 총점이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[180px_90px_1fr_80px] bg-slate-100 text-xs font-black text-slate-500">
              <div className="p-3">검사 시기</div>
              <div className="p-3 text-center">과목</div>
              <div className="p-3">세부 분류</div>
              <div className="p-3 text-center">값</div>
            </div>
            {curriculumRows.length ? (
              curriculumRows.map(({ period, detail }) => (
                <div
                  key={`curriculum-${period}-${detail.subject}-${detail.category}`}
                  className="grid grid-cols-[180px_90px_1fr_80px] border-t border-slate-200 text-sm"
                >
                  <div className="bg-slate-50 p-3 font-black text-slate-600">{period || "-"}</div>
                  <div className="p-3 text-center text-slate-700">{detail.subject}</div>
                  <div className="p-3 text-slate-700">{detail.category}</div>
                  <div className="p-3 text-center font-bold text-slate-700">{detail.value}</div>
                </div>
              ))
            ) : (
              <div className="border-t border-slate-200 p-4 text-center text-sm font-bold text-slate-400">
                추가된 세부 분류가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherNoteDataBlock({ value }: { value?: string }) {
  const records = parseTeacherNoteData(value);

  return (
    <StructuredDataBlock
      title="학생 특성(교사 입력)"
      columns="160px 1fr"
      headers={["구분", "내용"]}
      emptyText="미입력"
      rows={records.map((record, index) => ({
        key: `${record.category}-${index}`,
        cells: [record.category, record.content],
      }))}
    />
  );
}

function SchoolSpecialInfoDataBlock({ value }: { value?: string }) {
  const records = parseSchoolSpecialInfoData(value);

  return (
    <StructuredDataBlock
      title="학교에 대한 특화정보(교사 입력)"
      columns="140px 160px 1fr"
      headers={["학교명", "구분", "내용"]}
      emptyText="미입력"
      rows={records.map((record, index) => ({
        key: `${record.schoolName}-${record.category}-${index}`,
        cells: [record.schoolName, record.category, record.content],
      }))}
    />
  );
}

function SchoolWebInfoDataBlock({ value }: { value?: string }) {
  const records = parseSchoolWebInfoData(value);

  return (
    <StructuredDataBlock
      title="학교 기본 정보 및 웹정보(AI)"
      columns="140px 160px 1fr"
      headers={["학교명", "유형", "내용"]}
      emptyText="미입력"
      rows={records.map((record, index) => ({
        key: `${record.schoolName}-${record.type}-${index}`,
        cells: [record.schoolName, record.type, record.content],
      }))}
    />
  );
}

function StructuredDataBlock({
  title,
  columns,
  headers,
  rows,
  emptyText,
}: {
  title: string;
  columns: string;
  headers: string[];
  rows: Array<{ key: string; cells: string[] }>;
  emptyText: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 lg:col-span-2">
      <p className="text-sm font-black text-slate-500">{title}</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="min-w-[720px]">
          <div className="grid bg-slate-100 text-xs font-black text-slate-500" style={{ gridTemplateColumns: columns }}>
            {headers.map((header) => (
              <div key={header} className="p-3">
                {header}
              </div>
            ))}
          </div>
          {rows.length ? (
            rows.map((row) => (
              <div key={row.key} className="grid border-t border-slate-200 text-sm" style={{ gridTemplateColumns: columns }}>
                {row.cells.map((cell, index) => (
                  <div key={`${row.key}-${index}`} className="whitespace-pre-wrap p-3 leading-6 text-slate-700">
                    {cell || "-"}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="border-t border-slate-200 p-4 text-center text-sm font-bold text-slate-400">
              {emptyText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DataBlock({ title, value }: { title: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-500">{title}</p>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {value?.trim() || "미입력"}
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 py-3 last:border-0">
      <p className="text-xs font-black uppercase text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-white">{value || "-"}</p>
    </div>
  );
}

function hasReportInputData(student: TeacherStudentInput) {
  return Boolean(
    student.personalityData?.trim() ||
      student.diagnosisData?.trim() ||
      student.studentCharacteristics?.trim() ||
      student.schoolSpecialInfo?.trim() ||
      student.schoolWebInfo?.trim(),
  );
}

function readStoredStudent(studentId: string) {
  const localStudents = readArray(localStorageKey);
  const edits = readRecord(editsStorageKey);

  return edits[studentId] ?? localStudents.find((student) => student.id === studentId) ?? null;
}

function readArray(key: string): TeacherStudentInput[] {
  const stored = window.localStorage.getItem(key);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as TeacherStudentInput[];
  } catch {
    return [];
  }
}

function readRecord(key: string): Record<string, TeacherStudentInput> {
  const stored = window.localStorage.getItem(key);
  if (!stored) return {};

  try {
    return JSON.parse(stored) as Record<string, TeacherStudentInput>;
  } catch {
    return {};
  }
}

function parseTeacherNoteData(value?: string): TeacherNoteRecord[] {
  const parsed = parseJsonRecord(value);
  if (parsed && Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      const category = toStringValue(record.category);
      const content = toStringValue(record.content);
      return category || content ? [{ category: category || "기존 입력", content }] : [];
    });
  }

  const content = value?.trim() ?? "";
  return content ? [{ category: "기존 입력", content }] : [];
}

function parseSchoolSpecialInfoData(value?: string): SchoolSpecialInfoRecord[] {
  const parsed = parseJsonRecord(value);
  if (parsed && Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      const schoolName = toStringValue(record.schoolName);
      const category = toStringValue(record.category);
      const content = toStringValue(record.content);
      return schoolName || category || content
        ? [{ schoolName: schoolName || "-", category: category || "기존 입력", content }]
        : [];
    });
  }

  const content = value?.trim() ?? "";
  return content ? [{ schoolName: "-", category: "기존 입력", content }] : [];
}

function parseSchoolWebInfoData(value?: string): SchoolWebInfoRecord[] {
  const parsed = parseJsonRecord(value);
  if (parsed && Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      const schoolName = toStringValue(record.schoolName);
      const type = toStringValue(record.type);
      const content = toStringValue(record.content);
      return schoolName || type || content
        ? [{ schoolName: schoolName || "-", type: type || "기존 입력", content }]
        : [];
    });
  }

  const content = value?.trim() ?? "";
  return content ? [{ schoolName: "-", type: "기존 입력", content }] : [];
}

function parsePersonalityRecords(value?: string): PersonalityRecord[] | null {
  const parsed = parseJsonRecord(value);
  if (!parsed) return null;

  if (Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      return [{
        period: toStringValue(record.period),
        qualitativeValue: toStringValue(record.qualitativeValue),
        quantitativeValue: toStringValue(record.quantitativeValue),
        quantitativeDetails: normalizeQuantitativeDetails(record.quantitativeDetails),
      }];
    });
  }

  if (!isRecord(parsed.qualitative)) return null;

  return personalityStages.map((period) => ({
    period,
    qualitativeValue: personalityQualRows
      .map((row) => {
        const value = readGridValue(parsed.qualitative, row, period);
        return value ? `${row}: ${value}` : "";
      })
      .filter(Boolean)
      .join("\n"),
    quantitativeValue: isRecord(parsed.scale)
      ? Object.keys(parsed.scale)
        .map((row) => {
          const value = readGridValue(parsed.scale, row, period);
          return value ? `${row}: ${value}` : "";
        })
        .filter(Boolean)
        .join("\n")
      : "",
    quantitativeDetails: isRecord(parsed.scale)
      ? Object.keys(parsed.scale).flatMap((row) => {
        const value = readGridValue(parsed.scale, row, period);
        return value ? [{ group: row, category: row, value }] : [];
      })
      : [],
  })).filter((record) => record.qualitativeValue || record.quantitativeValue);
}

function parseDiagnosisRecords(value?: string): DiagnosisRecord[] | null {
  const parsed = parseJsonRecord(value);
  if (!parsed) return null;

  if (Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      return [{
        period: toStringValue(record.period),
        korean: toStringValue(record.korean),
        english: toStringValue(record.english),
        math: toStringValue(record.math),
        curriculumDetail: toStringValue(record.curriculumDetail),
        curriculumDetails: normalizeCurriculumDetails(record.curriculumDetails),
      }];
    });
  }

  if (!isRecord(parsed.totalScores)) return null;

  const periods = new Set<string>();
  Object.values(parsed.totalScores).forEach((row) => {
    if (isRecord(row)) {
      Object.keys(row).forEach((period) => periods.add(period));
    }
  });

  return Array.from(periods).map((period) => ({
    period,
    korean: readGridValue(parsed.totalScores, "국어", period),
    english: readGridValue(parsed.totalScores, "영어", period),
    math: readGridValue(parsed.totalScores, "수학", period),
    curriculumDetail: "",
    curriculumDetails: [],
  }));
}

function parseJsonRecord(value?: string): Record<string, unknown> | null {
  if (!value?.trim()) return null;

  try {
    const parsed = JSON.parse(value);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readGridValue(value: unknown, row: string, column: string) {
  if (!isRecord(value) || !isRecord(value[row])) return "";
  return toStringValue(value[row][column]);
}

function normalizeCurriculumDetails(value: unknown): CurriculumDetail[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((detail) => {
    if (!isRecord(detail)) return [];

    const subject = toStringValue(detail.subject);
    const category = toStringValue(detail.category);
    const detailValue = toStringValue(detail.value);
    if (!subject || !category || !detailValue) return [];

    return [{ subject, category, value: detailValue }];
  });
}

function normalizeQuantitativeDetails(value: unknown): QuantitativeDetail[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((detail) => {
    if (!isRecord(detail)) return [];

    const group = toStringValue(detail.group) || toStringValue(detail.category);
    const category = toStringValue(detail.category);
    const detailValue = toStringValue(detail.value);
    if (!category || !detailValue) return [];

    return [{ group, category, value: detailValue }];
  });
}

function toStringValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
