"use client";

import { Card, StatusBadge, formatDate, formatSchool } from "@/components/report-ui";
import type { SchoolLevel, StudentRecord, StudentSummaryStatus } from "@/types/student";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type TeacherStudentItem = {
  id: string;
  name: string;
  gender: string;
  region: string;
  schoolLevel: SchoolLevel;
  grade: number;
  school: string;
  latestCareerGoal: string;
  careerTrack: string;
  personalityData: string;
  diagnosisData: string;
  nearbyMiddleSchools: string[];
  studentCharacteristics: string;
  schoolSpecialInfo: string;
  schoolWebInfo: string;
  lastAnalyzedAt: string;
  status: StudentSummaryStatus;
  latestMemo: string;
  hasReport: boolean;
  source: "mock" | "local";
};

type FormState = {
  name: string;
  gender: string;
  region: string;
  schoolLevel: SchoolLevel;
  grade: string;
  school: string;
  latestCareerGoal: string;
  careerTrack: string;
  personalityData: string;
  diagnosisData: string;
  nearbyMiddleSchools: string;
  studentCharacteristics: string;
  schoolSpecialInfo: string;
  schoolWebInfo: string;
  memo: string;
};

const localStorageKey = "teen-fit.teacher.localStudents";
const editsStorageKey = "teen-fit.teacher.studentEdits";
const hiddenMockStudentIds = new Set(["STU-2401"]);

const initialForm: FormState = {
  name: "",
  gender: "여",
  region: "",
  schoolLevel: "middle",
  grade: "1",
  school: "",
  latestCareerGoal: "",
  careerTrack: "",
  personalityData: "",
  diagnosisData: "",
  nearbyMiddleSchools: "",
  studentCharacteristics: "",
  schoolSpecialInfo: "",
  schoolWebInfo: "",
  memo: "",
};

const elementaryHumanitiesPreset: FormState = {
  name: "이수아",
  gender: "여",
  region: "서울 강동구",
  schoolLevel: "elementary",
  grade: "6",
  school: "초6 / 중학교 진학 예정",
  latestCareerGoal: "언론인/기자",
  careerTrack: "문과계열",
  nearbyMiddleSchools: "한산중, 둔촌중, 성내중",
  memo: "문해력과 비판적 읽기 강점이 뚜렷한 초6 문과계열 학생",
  personalityData: JSON.stringify({
    records: [
      {
        period: "초등학교 6학년",
        qualitativeValue: [
          "주요 관심 과목: 국어, 사회, 영어",
          "학습 태도: 비판적 읽기, 사회 현상에 대한 질문 중심의 탐구",
          "핵심 강점: 문맥 파악 능력, 논리적인 글쓰기, 다양한 관점의 비교 분석",
          "지도 핵심: 객관적 사실과 주관적 견해 구분하기, 미디어 리터러시 함양",
          "선호: 아침형, 신문/뉴스 콘텐츠, 도서관/학습실",
        ].join("\n"),
        quantitativeValue: [
          "인지 방식: 분석형 22 vs 통합형 3",
          "사고 방식: 숙고형 20 vs 행동형 5",
          "도출 방식: 확산형 23 vs 수렴형 2",
          "동기 방식: 외재형 5 vs 내재형 20",
          "주도 방식: 타율형 8 vs 자율형 17",
          "환경 방식: 홀로형 18 vs 함께형 7",
          "참여 방식: 적극형 20 vs 소극형 5",
          "지향 방식: 경쟁지향 10 vs 협동형 15",
        ].join("\n"),
        quantitativeDetails: [
          { group: "인지 방식", category: "분석형(25) vs 통합형(0)", value: "22 vs 3" },
          { group: "사고 방식", category: "숙고형(25) vs 행동형(0)", value: "20 vs 5" },
          { group: "도출 방식", category: "확산형(25) vs 수렴형(0)", value: "23 vs 2" },
          { group: "동기 방식", category: "외재형(25) vs 내재형(0)", value: "5 vs 20" },
          { group: "주도 방식", category: "타율형(25) vs 자율형(0)", value: "8 vs 17" },
          { group: "환경 방식", category: "홀로형(25) vs 함께형(0)", value: "18 vs 7" },
          { group: "참여 방식", category: "적극형(25) vs 소극형(0)", value: "20 vs 5" },
          { group: "지향 방식", category: "경쟁지향(25) vs 협동형(0)", value: "10 vs 15" },
          { group: "시간 선호", category: "(선택 1)", value: "아침형" },
          { group: "매체 유형", category: "(선택 1)", value: "신문/뉴스 콘텐츠" },
          { group: "공부 장소", category: "(선택 1)", value: "도서관/학습실" },
        ],
      },
    ],
  }),
  diagnosisData: JSON.stringify({
    records: [
      {
        period: "초등학교 6학년 2학기",
        korean: "95",
        english: "92",
        math: "88",
        curriculumDetail: [
          "국어: 문학 98%, 문법 92%, 읽기 95%, 듣기/말하기 96%, 매체 94%, 쓰기 90% / 난이도 성취도 상 88%, 중 95%, 하 100%",
          "영어: 듣기 95%, 말하기 90%, 읽기 96%, 쓰기 92%, 어휘력 98% / 난이도 성취도 상 85%, 중 94%, 하 99%",
          "수학: 수와 연산 86%, 도형과 측정 84%, 변화와 관계 90%, 자료와 가능성 92% / 난이도 성취도 상 78%, 중 90%, 하 100%",
        ].join("\n"),
        curriculumDetails: [
          { subject: "국어", category: "문학", value: "98" },
          { subject: "국어", category: "문법", value: "92" },
          { subject: "국어", category: "읽기", value: "95" },
          { subject: "국어", category: "듣기/말하기", value: "96" },
          { subject: "국어", category: "매체", value: "94" },
          { subject: "국어", category: "쓰기", value: "90" },
          { subject: "영어", category: "듣기", value: "95" },
          { subject: "영어", category: "말하기", value: "90" },
          { subject: "영어", category: "읽기", value: "96" },
          { subject: "영어", category: "쓰기", value: "92" },
          { subject: "영어", category: "어휘력", value: "98" },
          { subject: "수학", category: "수와 연산", value: "86" },
          { subject: "수학", category: "도형과 측정", value: "84" },
          { subject: "수학", category: "변화와 관계", value: "90" },
          { subject: "수학", category: "자료와 가능성", value: "92" },
        ],
      },
    ],
  }),
  studentCharacteristics: JSON.stringify({
    records: [
      {
        category: "학습 태도",
        content: "교내 신문 활용 교육(NIE) 시, 단순 정보 요약을 넘어 기사의 의도와 사회적 배경을 분석하는 비판적 읽기 능력이 탁월함. 토론 수업 시 논리적인 근거를 바탕으로 상대방을 설득하는 과정에서 높은 집중력을 보임.",
      },
      {
        category: "취향 및 활동",
        content: "평소 인문학 및 사회과학 관련 도서를 즐겨 읽으며, 관심 있는 주제에 대해 스스로 '나만의 작은 기사'를 써보는 습관이 있음. 화려한 수식어보다는 통계와 팩트를 활용한 명료한 문장을 선호함.",
      },
      {
        category: "특이점",
        content: "완벽주의적 성향이 있어 결과물의 완성도에 민감한 편임. 가끔 정답이 없는 열린 결말의 토론에서 정답을 찾으려 고심하는 모습이 보이나, 최근에는 다양한 관점을 수용하며 사고의 유연성을 기르는 중임.",
      },
    ],
  }),
  schoolSpecialInfo: JSON.stringify({
    records: [
      { schoolName: "한산중", category: "시험 출제 특성", content: "국어/영어 외부 지문 활용도가 인근 학교 중 가장 높은 편. 단순 암기보다 처음 보는 지문에 대한 문해력을 요구하는 문제가 많아 수아 학생처럼 비판적 읽기 능력이 좋은 학생에게 유리함." },
      { schoolName: "한산중", category: "서술형", content: "서술형 비중이 40~50%에 육박하며, 영어는 본문 내용을 요약해 조건에 맞게 쓰는 논술형에 가깝게 출제됨." },
      { schoolName: "한산중", category: "학교 행사/동아리", content: "방송반과 자율 동아리 활동이 활발하고, 학생 주도형 동아리 개설이 비교적 자유로운 편." },
      { schoolName: "한산중", category: "학습 팁", content: "방학 기간 심화 독서 논술 특강 수요가 높으며 수행평가 수준이 까다로운 편." },
      { schoolName: "둔촌중", category: "시험 출제 특성", content: "영어 교과서 본문 외 학습지의 심화 어휘와 예문 출제가 많고 문법 비중이 높음." },
      { schoolName: "둔촌중", category: "학교 행사/동아리", content: "진로 탐색 주간에 기자, 작가 등 외부 강사 초청 강연이 잦은 편." },
      { schoolName: "성내중", category: "시험 출제 특성", content: "국어/영어 외부 지문 출제 비율이 30%를 상회하고, 영어 독해 지문 수준이 고1 모의고사 수준까지 올라가기도 함." },
      { schoolName: "성내중", category: "서술형", content: "특정 학기에 국어 또는 영어를 서술형 100%로 출제하는 사례가 있어 대비 필요." },
      { schoolName: "성내중", category: "학교 행사/동아리", content: "성내제 규모가 크고 학생이 직접 부스를 운영하는 기획 활동이 돋보임." },
      { schoolName: "성내중", category: "학습 팁", content: "내신 대비반이 고난도 문항 대비를 위해 고등부 교재를 일부 섞어 수업할 만큼 난이도가 있는 편." },
    ],
  }),
  schoolWebInfo: JSON.stringify({
    records: [
      {
        schoolName: "한산중, 둔촌중, 성내중",
        type: "AI 요약 예정",
        content: "학교 기본 정보와 웹정보는 추후 AI 수집/요약 대상으로 관리합니다.",
      },
    ],
  }),
};

const personalityPeriods = ["초등학교 6학년", "중학교 1학년", "중학교 2학년"] as const;
const diagnosisPeriods = [
  "초등학교 6학년 1학기",
  "초등학교 6학년 2학기",
  "중학교 1학년 1학기",
  "중학교 1학년 2학기",
  "중학교 2학년 1학기",
  "중학교 2학년 2학기",
] as const;
const personalityQualRows = ["주요 관심 과목", "학습 태도", "핵심 강점", "지도 핵심"] as const;
const personalityQuantitativeOptions = [
  { group: "인지 방식", category: "분석형(25) vs 통합형(0)" },
  { group: "사고 방식", category: "숙고형(25) vs 행동형(0)" },
  { group: "도출 방식", category: "확산형(25) vs 수렴형(0)" },
  { group: "동기 방식", category: "외재형(25) vs 내재형(0)" },
  { group: "주도 방식", category: "타율형(25) vs 자율형(0)" },
  { group: "환경 방식", category: "홀로형(25) vs 함께형(0)" },
  { group: "참여 방식", category: "적극형(25) vs 소극형(0)" },
  { group: "시간 선호", category: "" },
  { group: "지향 방식", category: "경쟁지향(25) vs 협동형(0)" },
  { group: "매체 유형", category: "" },
  { group: "공부 장소", category: "" },
  { group: "좋아하는 과목", category: "" },
  { group: "싫어하는 과목", category: "" },
] as const;
const diagnosisSubjects = ["국어", "영어", "수학"] as const;
const diagnosisCurriculumOptions = {
  국어: ["문학", "문법", "읽기", "듣기/말하기", "매체", "쓰기", "상(난이도)", "중(난이도)", "하(난이도)"],
  영어: ["듣기", "말하기", "읽기", "쓰기", "어휘력", "상(난이도)", "중(난이도)", "하(난이도)"],
  수학: ["수와 연산", "도형과 측정", "변화와 관계", "자료와 가능성", "상(난이도)", "중(난이도)", "하(난이도)"],
} as const;
const studentCharacteristicCategories = ["학습 태도", "취향 및 활동", "특이점", "관계", "상담 메모", "기타"] as const;
const schoolSpecialCategories = ["시험 출제 특성", "서술형", "학교 행사/동아리", "학습 팁", "학사 일정", "수행평가", "기타"] as const;

type DiagnosisSubject = (typeof diagnosisSubjects)[number];
type CurriculumDetail = {
  subject: DiagnosisSubject | string;
  category: string;
  value: string;
};
type QuantitativeDetail = {
  group: string;
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

type PersonalityData = {
  records: Array<{
    period: string;
    qualitativeValue: string;
    quantitativeValue: string;
    quantitativeDetails: QuantitativeDetail[];
  }>;
};

type DiagnosisData = {
  records: Array<{
    period: string;
    korean: string;
    english: string;
    math: string;
    curriculumDetail: string;
    curriculumDetails: CurriculumDetail[];
  }>;
};

export function TeacherStudentManager({ students }: { students: StudentRecord[] }) {
  const [localStudents, setLocalStudents] = useState<TeacherStudentItem[]>([]);
  const [studentEdits, setStudentEdits] = useState<Record<string, TeacherStudentItem>>({});
  const [form, setForm] = useState<FormState>(initialForm);
  const [editForm, setEditForm] = useState<FormState>(initialForm);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLocalStudents(readLocalStudents());
      setStudentEdits(readStudentEdits());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(localStudents));
  }, [localStudents]);

  useEffect(() => {
    window.localStorage.setItem(editsStorageKey, JSON.stringify(studentEdits));
  }, [studentEdits]);

  const items = useMemo(
    () => [
      ...students
        .filter((student) => !hiddenMockStudentIds.has(student.id))
        .map((student) => studentEdits[student.id] ?? toTeacherStudentItem(student)),
      ...localStudents,
    ],
    [students, studentEdits, localStudents],
  );

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateEditForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setEditForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStudent = createStudentFromForm(form);
    if (!nextStudent) return;

    setLocalStudents((current) => [nextStudent, ...current]);
    setForm(initialForm);
    setIsAdding(false);
  }

  function startEdit(student: TeacherStudentItem) {
    if (student.status === "ready") return;

    setEditingStudentId(student.id);
    setEditForm(toFormState(student));
    setIsAdding(false);
  }

  function cancelEdit() {
    setEditingStudentId(null);
    setEditForm(initialForm);
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>, student: TeacherStudentItem) {
    event.preventDefault();

    const updated = updateStudentFromForm(student, editForm);
    if (!updated) return;

    if (student.source === "local") {
      setLocalStudents((current) => current.map((item) => (item.id === student.id ? updated : item)));
    } else {
      setStudentEdits((current) => ({ ...current, [student.id]: updated }));
    }

    cancelEdit();
  }

  function removeLocalStudent(studentId: string) {
    setLocalStudents((current) => current.filter((student) => student.id !== studentId));
  }

  function resetMockEdit(studentId: string) {
    setStudentEdits((current) => {
      const next = { ...current };
      delete next[studentId];
      return next;
    });
  }

  return (
    <div className="mt-8 grid gap-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">학생 목록</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              mock 학생과 선생님이 임시 추가한 학생을 함께 관리합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAdding((current) => !current);
              cancelEdit();
            }}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
          >
            {isAdding ? "추가 취소" : "학생 추가"}
          </button>
        </div>

        {isAdding ? (
          <StudentForm
            form={form}
            submitLabel="목록에 추가"
            onSubmit={handleSubmit}
            onUpdate={updateForm}
          />
        ) : null}
      </section>

      <div className="grid gap-4">
        {items.map((student) => (
          <Card key={student.id}>
            {editingStudentId === student.id ? (
              <StudentEditForm
                form={editForm}
                student={student}
                onCancel={cancelEdit}
                onSubmit={(event) => handleEditSubmit(event, student)}
                onUpdate={updateEditForm}
              />
            ) : (
              <StudentCardContent
                edited={student.source === "mock" && Boolean(studentEdits[student.id])}
                student={student}
                onEdit={() => startEdit(student)}
                onRemove={() => removeLocalStudent(student.id)}
                onReset={() => resetMockEdit(student.id)}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function StudentCardContent({
  edited,
  student,
  onEdit,
  onRemove,
  onReset,
}: {
  edited: boolean;
  student: TeacherStudentItem;
  onEdit: () => void;
  onRemove: () => void;
  onReset: () => void;
}) {
  const canEdit = student.status !== "ready";
  const teacherNoteSummary = formatTeacherNoteSummary(student.studentCharacteristics);
  const summaryItems = [
    { label: "주변 중학교", value: student.nearbyMiddleSchools.join(", ") },
    { label: "계열", value: student.careerTrack },
    { label: "교사 파악 특성", value: teacherNoteSummary },
  ].filter((item) => item.value.trim());

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_180px] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-black text-slate-950">{student.name}</h2>
          <StatusBadge status={student.status} />
          {student.source === "local" ? <Pill>임시 추가</Pill> : null}
          {edited ? <Pill tone="amber">수정됨</Pill> : null}
        </div>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-4">
          <p>{formatSchool(student.schoolLevel, student.grade)}</p>
          <p>{student.region || student.school}</p>
          <p>희망 진로: {student.latestCareerGoal}</p>
          <p>최근 분석: {formatDate(student.lastAnalyzedAt)}</p>
        </div>
        {summaryItems.length ? (
          <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 md:grid-cols-2">
            {summaryItems.map((item) => (
              <SummaryLine key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-slate-500">최근 관찰 메모: {student.latestMemo}</p>
      </div>

      <div className="grid gap-2">
        {student.hasReport ? (
          <Link
            href={`/teacher/students/${student.id}/report`}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white"
          >
            결과지 보기
          </Link>
        ) : (
          <span className="rounded-2xl bg-slate-100 px-5 py-3 text-center text-sm font-black text-slate-500">
            결과지 준비 전
          </span>
        )}
        {canEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700"
          >
            수정
          </button>
        ) : null}
        {edited ? (
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl border border-amber-200 px-5 py-3 text-sm font-black text-amber-700"
          >
            원래값
          </button>
        ) : null}
        {student.source === "local" ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-500"
          >
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}

function StudentEditForm({
  form,
  student,
  onCancel,
  onSubmit,
  onUpdate,
}: {
  form: FormState;
  student: TeacherStudentItem;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-950">{student.name} 정보 수정</h2>
          <p className="mt-1 text-sm text-slate-500">수정 내용은 브라우저에 임시 저장됩니다.</p>
        </div>
        <StatusBadge status={student.status} />
      </div>
      <StudentForm
        form={form}
        submitLabel="저장"
        onCancel={onCancel}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
      />
    </div>
  );
}

function StudentForm({
  form,
  submitLabel,
  onCancel,
  onSubmit,
  onUpdate,
}: {
  form: FormState;
  submitLabel: string;
  onCancel?: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  function applyPreset() {
    Object.entries(elementaryHumanitiesPreset).forEach(([key, value]) => {
      onUpdate(key as keyof FormState, value);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 grid gap-4 border-t border-slate-200 pt-5">
      <div className="rounded-2xl bg-emerald-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-emerald-900">초6 문과 예시 입력값</p>
            <p className="mt-1 text-xs font-bold leading-5 text-emerald-700">
              업로드한 엑셀의 진단검사, 성향검사, 학생 특성, 주변학교 특성을 학생 추가 입력값으로 채웁니다.
            </p>
          </div>
          <button
            type="button"
            onClick={applyPreset}
            className="rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white"
          >
            예시값 적용
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="이름">
          <input
            required
            value={form.name}
            onChange={(event) => onUpdate("name", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 홍길동"
          />
        </Field>
        <Field label="성별">
          <select
            value={form.gender}
            onChange={(event) => onUpdate("gender", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
          >
            <option value="여">여</option>
            <option value="남">남</option>
            <option value="기타">기타</option>
          </select>
        </Field>
        <Field label="거주 지역">
          <input
            required
            value={form.region}
            onChange={(event) => onUpdate("region", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 서울 강동구"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-[180px_140px_1fr]">
        <Field label="학교급">
          <select
            value={form.schoolLevel}
            onChange={(event) => onUpdate("schoolLevel", event.target.value as SchoolLevel)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
          >
            <option value="elementary">초등학교</option>
            <option value="middle">중학교</option>
            <option value="high">고등학교</option>
          </select>
        </Field>
        <Field label="학년">
          <select
            value={form.grade}
            onChange={(event) => onUpdate("grade", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
          >
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <option key={grade} value={String(grade)}>
                {grade}학년
              </option>
            ))}
          </select>
        </Field>
        <Field label="현재 학교 또는 배정 전 상태">
          <input
            required
            value={form.school}
            onChange={(event) => onUpdate("school", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 초6 / 진학 예정"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="현재 희망 진로">
          <input
            required
            value={form.latestCareerGoal}
            onChange={(event) => onUpdate("latestCareerGoal", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 로봇공학자"
          />
        </Field>
        <Field label="계열/관심 분야">
          <input
            value={form.careerTrack}
            onChange={(event) => onUpdate("careerTrack", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 문과계열"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="주변 중학교 정보">
          <input
            value={form.nearbyMiddleSchools}
            onChange={(event) => onUpdate("nearbyMiddleSchools", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="예: 한산중, 둔촌중, 성내중"
          />
        </Field>
        <Field label="관찰 메모">
          <input
            value={form.memo}
            onChange={(event) => onUpdate("memo", event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
            placeholder="상담 전 확인할 간단한 메모"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PersonalityPeriodInput
          value={form.personalityData}
          onChange={(value) => onUpdate("personalityData", value)}
        />
        <DiagnosisPeriodInput
          value={form.diagnosisData}
          onChange={(value) => onUpdate("diagnosisData", value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TeacherNoteInput
          value={form.studentCharacteristics}
          onChange={(value) => onUpdate("studentCharacteristics", value)}
        />
        <SchoolSpecialInfoInput
          value={form.schoolSpecialInfo}
          onChange={(value) => onUpdate("schoolSpecialInfo", value)}
        />
        <SchoolWebInfoInput
          value={form.schoolWebInfo}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600"
          >
            취소
          </button>
        ) : null}
        <button type="submit" className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function PersonalityPeriodInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const data = parsePersonalityData(value);
  const [qualitativeDraft, setQualitativeDraft] = useState({
    period: "",
    qualitativeValue: "",
  });
  const [quantitativeDraft, setQuantitativeDraft] = useState({
    period: "",
    item: "",
    value: "",
  });

  function saveQualitativeRecord() {
    const period = qualitativeDraft.period.trim();
    const qualitativeValue = qualitativeDraft.qualitativeValue.trim();
    if (!period || !qualitativeValue) return;

    const existing = data.records.find((record) => record.period === period);

    onChange(stringifyData({
      records: [
        ...data.records.filter((record) => record.period !== period),
        {
          period,
          qualitativeValue,
          quantitativeValue: existing?.quantitativeValue ?? "",
          quantitativeDetails: existing?.quantitativeDetails ?? [],
        },
      ],
    }));
    setQualitativeDraft({ period: "", qualitativeValue: "" });
  }

  function saveQuantitativeRecord() {
    const period = quantitativeDraft.period.trim();
    const option = personalityQuantitativeOptions.find((item) => item.group === quantitativeDraft.item);
    const group = option?.group ?? "";
    const category = option?.category ?? "";
    const detailValue = quantitativeDraft.value.trim();
    if (!period || !group || !detailValue) return;

    const existing = data.records.find((record) => record.period === period);
    const quantitativeDetails = [
      ...(existing?.quantitativeDetails ?? []).filter(
        (detail) => !(detail.group === group && detail.category === category),
      ),
      { group, category, value: detailValue },
    ];

    onChange(stringifyData({
      records: [
        ...data.records.filter((record) => record.period !== period),
        {
          period,
          qualitativeValue: existing?.qualitativeValue ?? "",
          quantitativeValue: formatQuantitativeDetails(quantitativeDetails),
          quantitativeDetails,
        },
      ],
    }));
    setQuantitativeDraft({ period: "", item: "", value: "" });
  }

  function removePersonalityValue(period: string, field: "qualitativeValue" | "quantitativeValue") {
    onChange(stringifyData({
      records: data.records.flatMap((record) => {
        if (record.period !== period) return [record];

        const next = field === "quantitativeValue"
          ? { ...record, quantitativeValue: "", quantitativeDetails: [] }
          : { ...record, [field]: "" };
        return next.qualitativeValue || next.quantitativeValue ? [next] : [];
      }),
    }));
  }

  function removeQuantitativeDetail(period: string, target: QuantitativeDetail) {
    onChange(stringifyData({
      records: data.records.flatMap((record) => {
        if (record.period !== period) return [record];

        const quantitativeDetails = record.quantitativeDetails.filter(
          (detail) => !(detail.group === target.group && detail.category === target.category),
        );
        const next = {
          ...record,
          quantitativeDetails,
          quantitativeValue: formatQuantitativeDetails(quantitativeDetails),
        };

        return next.qualitativeValue || next.quantitativeValue ? [next] : [];
      }),
    }));
  }

  const qualitativeRecords = data.records.filter((record) => record.qualitativeValue);
  const quantitativeRows = data.records.flatMap((record) =>
    record.quantitativeDetails.length
      ? record.quantitativeDetails.map((detail) => ({ period: record.period, detail }))
      : record.quantitativeValue
        ? [{ period: record.period, detail: { group: "기존 입력", category: "수치 검사값", value: record.quantitativeValue } }]
        : [],
  );
  const quantitativeOptions = personalityQuantitativeOptions.map((option) => option.group);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-slate-950">성향검사결과 data</h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            정성 검사값과 수치 검사값을 각각 따로 추가합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(stringifyData(createEmptyPersonalityData()))}
          className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
        >
          초기화
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black text-slate-500">정성 검사값 입력</p>
          <div className="mt-3 grid gap-3">
            <Field label="검사 시기">
              <PeriodSelect
                value={qualitativeDraft.period}
                options={[...personalityPeriods]}
                placeholder="학년 선택"
                onChange={(period) => setQualitativeDraft((current) => ({ ...current, period }))}
              />
            </Field>
            <TextAreaField
              label="정성 검사값"
              placeholder="예: 발표 참여가 늘고 문해력 기반 과제에서 강점"
              value={qualitativeDraft.qualitativeValue}
              onChange={(qualitativeValue) => setQualitativeDraft((current) => ({ ...current, qualitativeValue }))}
            />
            <button
              type="button"
              onClick={saveQualitativeRecord}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
            >
              {data.records.some((record) => record.period === qualitativeDraft.period && record.qualitativeValue)
                ? "정성값 수정"
                : "정성값 추가"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black text-slate-500">수치 검사값 입력</p>
          <div className="mt-3 grid gap-3">
            <Field label="검사 시기">
              <PeriodSelect
                value={quantitativeDraft.period}
                options={[...personalityPeriods]}
                placeholder="학년 선택"
                onChange={(period) => setQuantitativeDraft((current) => ({ ...current, period }))}
              />
            </Field>
            <Field label="구분">
              <PeriodSelect
                value={quantitativeDraft.item}
                options={quantitativeOptions}
                placeholder="구분 선택"
                onChange={(item) => setQuantitativeDraft((current) => ({ ...current, item }))}
              />
            </Field>
            <Field label="값">
              <input
                value={quantitativeDraft.value}
                onChange={(event) => setQuantitativeDraft((current) => ({ ...current, value: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
                placeholder="예: 22 vs 3"
              />
            </Field>
            <button
              type="button"
              onClick={saveQuantitativeRecord}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
            >
              {data.records.some((record) =>
                record.period === quantitativeDraft.period
                && record.quantitativeDetails.some((detail) => detail.group === quantitativeDraft.item)
              )
                ? "수치값 수정"
                : "수치값 추가"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <StructuredTable
          columns="180px 1fr 130px"
          headers={["검사 시기", "정성 검사값", "관리"]}
          emptyText="추가된 정성 검사값이 없습니다."
          rows={qualitativeRecords.map((record, index) => ({
            key: `qualitative-${record.period}-${index}`,
            cells: [record.period, record.qualitativeValue],
            index,
          }))}
          onEdit={(index) => {
            const record = qualitativeRecords[index];
            setQualitativeDraft({
              period: record.period,
              qualitativeValue: record.qualitativeValue,
            });
          }}
          onRemove={(index) => removePersonalityValue(qualitativeRecords[index].period, "qualitativeValue")}
        />

        <StructuredTable
          columns="180px 120px 1fr 100px 130px"
          headers={["검사 시기", "구분", "상세항목", "값", "관리"]}
          emptyText="추가된 수치 검사값이 없습니다."
          rows={quantitativeRows.map(({ period, detail }, index) => ({
            key: `quantitative-${period}-${detail.group}-${detail.category}-${index}`,
            cells: [period, detail.group, detail.category, detail.value],
            index,
          }))}
          onEdit={(index) => {
            const { period, detail } = quantitativeRows[index];
            setQuantitativeDraft({
              period,
              item: detail.group === "기존 입력" ? "" : detail.group,
              value: detail.value,
            });
          }}
          onRemove={(index) => {
            const { period, detail } = quantitativeRows[index];
            if (detail.category === "수치 검사값") {
              removePersonalityValue(period, "quantitativeValue");
              return;
            }
            removeQuantitativeDetail(period, detail);
          }}
        />
      </div>
    </section>
  );
}

function DiagnosisPeriodInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const data = parseDiagnosisData(value);
  const [scoreDraft, setScoreDraft] = useState({
    period: "",
    korean: "",
    english: "",
    math: "",
  });
  const [curriculumDraft, setCurriculumDraft] = useState({
    period: "",
    subject: "국어" as DiagnosisSubject,
    category: "",
    value: "",
  });

  function saveScoreRecord() {
    const period = scoreDraft.period.trim();
    if (!period) return;

    const existing = data.records.find((record) => record.period === period);

    onChange(stringifyData({
      records: [
        ...data.records.filter((record) => record.period !== period),
        {
          period,
          korean: scoreDraft.korean.trim(),
          english: scoreDraft.english.trim(),
          math: scoreDraft.math.trim(),
          curriculumDetail: existing?.curriculumDetail ?? "",
          curriculumDetails: existing?.curriculumDetails ?? [],
        },
      ],
    }));
    setScoreDraft({ period: "", korean: "", english: "", math: "" });
  }

  function saveCurriculumRecord() {
    const period = curriculumDraft.period.trim();
    const category = curriculumDraft.category.trim();
    const detailValue = curriculumDraft.value.trim();
    if (!period || !category || !detailValue) return;

    const existing = data.records.find((record) => record.period === period);
    const nextDetail = {
      subject: curriculumDraft.subject,
      category,
      value: detailValue,
    };
    const curriculumDetails = [
      ...(existing?.curriculumDetails ?? []).filter(
        (detail) => !(detail.subject === nextDetail.subject && detail.category === nextDetail.category),
      ),
      nextDetail,
    ];

    onChange(stringifyData({
      records: [
        ...data.records.filter((record) => record.period !== period),
        {
          period,
          korean: existing?.korean ?? "",
          english: existing?.english ?? "",
          math: existing?.math ?? "",
          curriculumDetail: formatCurriculumDetails(curriculumDetails),
          curriculumDetails,
        },
      ],
    }));
    setCurriculumDraft({ period: "", subject: "국어", category: "", value: "" });
  }

  function removeDiagnosisValue(period: string, field: "scores" | "curriculumDetail") {
    onChange(stringifyData({
      records: data.records.flatMap((record) => {
        if (record.period !== period) return [record];

        const next = field === "scores"
          ? { ...record, korean: "", english: "", math: "" }
          : { ...record, curriculumDetail: "", curriculumDetails: [] };

        return next.korean || next.english || next.math || next.curriculumDetail ? [next] : [];
      }),
    }));
  }

  function removeCurriculumDetail(period: string, target: CurriculumDetail) {
    onChange(stringifyData({
      records: data.records.flatMap((record) => {
        if (record.period !== period) return [record];

        const curriculumDetails = record.curriculumDetails.filter(
          (detail) => !(detail.subject === target.subject && detail.category === target.category),
        );
        const next = {
          ...record,
          curriculumDetails,
          curriculumDetail: formatCurriculumDetails(curriculumDetails),
        };

        return next.korean || next.english || next.math || next.curriculumDetail ? [next] : [];
      }),
    }));
  }

  const scoreRecords = data.records.filter((record) => record.korean || record.english || record.math);
  const curriculumRows = data.records.flatMap((record) =>
    record.curriculumDetails.length
      ? record.curriculumDetails.map((detail) => ({ period: record.period, detail }))
      : record.curriculumDetail
        ? [{ period: record.period, detail: { subject: "공통", category: "세부 분류", value: record.curriculumDetail } }]
        : [],
  );
  const curriculumOptions = diagnosisCurriculumOptions[curriculumDraft.subject];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-slate-950">진단검사 결과 data</h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            총점과 세부 분류 값을 각각 따로 추가합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(stringifyData(createEmptyDiagnosisData()))}
          className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
        >
          초기화
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black text-slate-500">총점 입력</p>
          <div className="mt-3 grid gap-3 md:grid-cols-4">
            <Field label="검사 시기">
              <PeriodSelect
                value={scoreDraft.period}
                options={[...diagnosisPeriods]}
                placeholder="학기 선택"
                onChange={(period) => setScoreDraft((current) => ({ ...current, period }))}
              />
            </Field>
            <Field label="국어">
              <ScoreInput value={scoreDraft.korean} onChange={(korean) => setScoreDraft((current) => ({ ...current, korean }))} />
            </Field>
            <Field label="영어">
              <ScoreInput value={scoreDraft.english} onChange={(english) => setScoreDraft((current) => ({ ...current, english }))} />
            </Field>
            <Field label="수학">
              <ScoreInput value={scoreDraft.math} onChange={(math) => setScoreDraft((current) => ({ ...current, math }))} />
            </Field>
            <button
              type="button"
              onClick={saveScoreRecord}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-4"
            >
              {scoreRecords.some((record) => record.period === scoreDraft.period) ? "총점 수정" : "총점 추가"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black text-slate-500">세부 분류 입력</p>
          <div className="mt-3 grid gap-3">
            <Field label="검사 시기">
              <PeriodSelect
                value={curriculumDraft.period}
                options={[...diagnosisPeriods]}
                placeholder="학기 선택"
                onChange={(period) => setCurriculumDraft((current) => ({ ...current, period }))}
              />
            </Field>
            <Field label="과목">
              <PeriodSelect
                value={curriculumDraft.subject}
                options={[...diagnosisSubjects]}
                placeholder="과목 선택"
                onChange={(subject) =>
                  setCurriculumDraft((current) => ({
                    ...current,
                    subject: subject as DiagnosisSubject,
                    category: "",
                  }))
                }
              />
            </Field>
            <Field label="세부 분류">
              <PeriodSelect
                value={curriculumDraft.category}
                options={[...curriculumOptions]}
                placeholder="세부 분류 선택"
                onChange={(category) => setCurriculumDraft((current) => ({ ...current, category }))}
              />
            </Field>
            <Field label="값">
              <ScoreInput
                value={curriculumDraft.value}
                onChange={(value) => setCurriculumDraft((current) => ({ ...current, value }))}
              />
            </Field>
            <button
              type="button"
              onClick={saveCurriculumRecord}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
            >
              {data.records.some((record) =>
                record.period === curriculumDraft.period
                && record.curriculumDetails.some(
                  (detail) => detail.subject === curriculumDraft.subject && detail.category === curriculumDraft.category,
                )
              )
                ? "세부 분류 수정"
                : "세부 분류 추가"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <StructuredTable
          columns="180px 80px 80px 80px 130px"
          headers={["검사 시기", "국어", "영어", "수학", "관리"]}
          emptyText="추가된 총점이 없습니다."
          rows={scoreRecords.map((record, index) => ({
            key: `scores-${record.period}-${index}`,
            cells: [record.period, record.korean || "-", record.english || "-", record.math || "-"],
            index,
          }))}
          onEdit={(index) => {
            const record = scoreRecords[index];
            setScoreDraft({
              period: record.period,
              korean: record.korean,
              english: record.english,
              math: record.math,
            });
          }}
          onRemove={(index) => removeDiagnosisValue(scoreRecords[index].period, "scores")}
        />

        <StructuredTable
          columns="180px 90px 1fr 80px 130px"
          headers={["검사 시기", "과목", "세부 분류", "값", "관리"]}
          emptyText="추가된 세부 분류가 없습니다."
          rows={curriculumRows.map(({ period, detail }, index) => ({
            key: `curriculum-${period}-${detail.subject}-${detail.category}-${index}`,
            cells: [period, detail.subject, detail.category, detail.value],
            index,
          }))}
          onEdit={(index) => {
            const { period, detail } = curriculumRows[index];
            const subject = diagnosisSubjects.includes(detail.subject as DiagnosisSubject)
              ? detail.subject as DiagnosisSubject
              : "국어";
            setCurriculumDraft({
              period,
              subject,
              category: detail.subject === "공통" ? "" : detail.category,
              value: detail.value,
            });
          }}
          onRemove={(index) => {
            const { period, detail } = curriculumRows[index];
            if (detail.subject === "공통") {
              removeDiagnosisValue(period, "curriculumDetail");
              return;
            }
            removeCurriculumDetail(period, detail);
          }}
        />
      </div>
    </section>
  );
}

function PeriodSelect({
  value,
  options,
  placeholder,
  onChange,
  compact = false,
}: {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`w-full border border-slate-200 font-bold outline-none focus:border-slate-950 ${
        compact ? "h-8 rounded-lg px-2 py-0 text-xs leading-none" : "rounded-xl px-4 py-3 text-sm"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function ScoreInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950"
      inputMode="numeric"
      placeholder="점수"
    />
  );
}

function TeacherNoteInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const records = parseTeacherNoteData(value);
  const [draft, setDraft] = useState({ category: "", content: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function saveRecord() {
    const category = draft.category.trim();
    const content = draft.content.trim();
    if (!category || !content) return;

    const nextRecord = { category, content };
    const nextRecords = editingIndex === null
      ? [...records, nextRecord]
      : records.map((record, index) => (index === editingIndex ? nextRecord : record));

    onChange(stringifyRecords(nextRecords));
    setDraft({ category: "", content: "" });
    setEditingIndex(null);
  }

  function editRecord(index: number) {
    setDraft(records[index]);
    setEditingIndex(index);
  }

  function removeRecord(index: number) {
    onChange(stringifyRecords(records.filter((_, itemIndex) => itemIndex !== index)));
    if (editingIndex === index) {
      setDraft({ category: "", content: "" });
      setEditingIndex(null);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
      <StructuredHeader
        title="학생 특성(교사 입력)"
        description="학생 특성을 구분별로 추가하고 수정합니다."
        onReset={() => onChange(stringifyRecords([]))}
      />
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <div className="max-w-[220px]">
          <Field label="구분">
            <PeriodSelect
              value={draft.category}
              options={[...studentCharacteristicCategories]}
              placeholder="구분 선택"
              compact
              onChange={(category) => setDraft((current) => ({ ...current, category }))}
            />
          </Field>
        </div>
        <div className="mt-3">
          <TextAreaField
            label="내용"
            placeholder="교사가 파악한 학습 태도, 관계, 강점, 주의점"
            value={draft.content}
            onChange={(content) => setDraft((current) => ({ ...current, content }))}
          />
        </div>
        <button
          type="button"
          onClick={saveRecord}
          className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          {editingIndex === null ? "항목 추가" : "항목 수정"}
        </button>
      </div>
      <TeacherNoteTable records={records} onEdit={editRecord} onRemove={removeRecord} />
    </section>
  );
}

function SchoolSpecialInfoInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const records = parseSchoolSpecialInfoData(value);
  const [draft, setDraft] = useState({ schoolName: "", category: "", content: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function saveRecord() {
    const schoolName = draft.schoolName.trim();
    const category = draft.category.trim();
    const content = draft.content.trim();
    if (!schoolName || !category || !content) return;

    const nextRecord = { schoolName, category, content };
    const nextRecords = editingIndex === null
      ? [...records, nextRecord]
      : records.map((record, index) => (index === editingIndex ? nextRecord : record));

    onChange(stringifyRecords(nextRecords));
    setDraft({ schoolName: "", category: "", content: "" });
    setEditingIndex(null);
  }

  function editRecord(index: number) {
    setDraft(records[index]);
    setEditingIndex(index);
  }

  function removeRecord(index: number) {
    onChange(stringifyRecords(records.filter((_, itemIndex) => itemIndex !== index)));
    if (editingIndex === index) {
      setDraft({ schoolName: "", category: "", content: "" });
      setEditingIndex(null);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
      <StructuredHeader
        title="학교에 대한 특화정보(교사 입력)"
        description="학교별 시험, 수행평가, 행사, 학습 팁을 항목별로 관리합니다."
        onReset={() => onChange(stringifyRecords([]))}
      />
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <div className="grid items-start gap-3 md:grid-cols-[180px_220px]">
          <Field label="학교명">
            <input
              value={draft.schoolName}
              onChange={(event) => setDraft((current) => ({ ...current, schoolName: event.target.value }))}
              className="h-8 w-full rounded-lg border border-slate-200 px-3 py-0 text-xs font-bold leading-none outline-none focus:border-slate-950"
              placeholder="예: 한산중"
            />
          </Field>
          <Field label="구분">
            <PeriodSelect
              value={draft.category}
              options={[...schoolSpecialCategories]}
              placeholder="구분 선택"
              compact
              onChange={(category) => setDraft((current) => ({ ...current, category }))}
            />
          </Field>
        </div>
        <div className="mt-3">
          <TextAreaField
            label="내용"
            placeholder="학교별 시험 특징, 수행평가, 분위기, 상담 포인트"
            value={draft.content}
            onChange={(content) => setDraft((current) => ({ ...current, content }))}
          />
        </div>
        <button
          type="button"
          onClick={saveRecord}
          className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          {editingIndex === null ? "항목 추가" : "항목 수정"}
        </button>
      </div>
      <SchoolSpecialInfoTable records={records} onEdit={editRecord} onRemove={removeRecord} />
    </section>
  );
}

function SchoolWebInfoInput({ value }: { value: string }) {
  const records = parseSchoolWebInfoData(value);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
      <div>
        <h3 className="text-sm font-black text-slate-950">학교 기본 정보 및 웹정보(AI)</h3>
        <p className="mt-1 text-xs font-bold text-slate-500">
          학교 기본 정보는 설정된 값을 기준으로 표시합니다.
        </p>
      </div>
      {records.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {records.map((record, index) => (
            <div
              key={`${record.schoolName}-${record.type}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-black text-slate-950">{record.schoolName || "-"}</p>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-slate-500">
                  {record.type || "기본 정보"}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm font-bold leading-6 text-slate-600">
                {record.content || "-"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-bold text-slate-400">
          설정된 학교 기본 정보가 없습니다.
        </div>
      )}
    </section>
  );
}

function StructuredHeader({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="text-sm font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-xs font-bold text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
      >
        초기화
      </button>
    </div>
  );
}

function TeacherNoteTable({
  records,
  onEdit,
  onRemove,
}: {
  records: TeacherNoteRecord[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <StructuredTable
      columns="160px 1fr 130px"
      headers={["구분", "내용", "관리"]}
      emptyText="추가된 학생 특성이 없습니다."
      rows={records.map((record, index) => ({
        key: `${record.category}-${index}`,
        cells: [record.category, record.content],
        index,
      }))}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

function SchoolSpecialInfoTable({
  records,
  onEdit,
  onRemove,
}: {
  records: SchoolSpecialInfoRecord[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <StructuredTable
      columns="140px 160px 1fr 130px"
      headers={["학교명", "구분", "내용", "관리"]}
      emptyText="추가된 학교 특화정보가 없습니다."
      rows={records.map((record, index) => ({
        key: `${record.schoolName}-${record.category}-${index}`,
        cells: [record.schoolName, record.category, record.content],
        index,
      }))}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

function StructuredTable({
  columns,
  headers,
  rows,
  emptyText,
  onEdit,
  onRemove,
}: {
  columns: string;
  headers: string[];
  rows: Array<{ key: string; cells: string[]; index: number }>;
  emptyText: string;
  onEdit?: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  const columnWidths = columns.split(" ");

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[720px] w-full border-collapse text-left">
        <colgroup>
          {columnWidths.map((width, index) => (
            <col key={`${width}-${index}`} style={{ width: width === "1fr" ? "auto" : width }} />
          ))}
        </colgroup>
        <thead className="bg-slate-100 text-xs font-black text-slate-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {rows.length ? (
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.key} className="border-t border-slate-200 text-sm align-top">
                {row.cells.map((cell, cellIndex) => {
                  const rowSpan = getStructuredTableRowSpan(rows, rowIndex, cellIndex);
                  if (!rowSpan) return null;

                  return (
                    <td
                      key={`${row.key}-${cellIndex}`}
                      rowSpan={rowSpan}
                      className="whitespace-pre-wrap border-r border-slate-100 p-3 leading-6 text-slate-700"
                    >
                      {cell || "-"}
                    </td>
                  );
                })}
                <td className="p-2">
                  <div className="flex gap-2">
                    {onEdit ? (
                      <button
                        type="button"
                        onClick={() => onEdit(row.index)}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                      >
                        수정
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onRemove(row.index)}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-500"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="border-t border-slate-200">
              <td colSpan={headers.length} className="p-4 text-center text-sm font-bold text-slate-400">
                {emptyText}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

function getStructuredTableRowSpan(
  rows: Array<{ key: string; cells: string[]; index: number }>,
  rowIndex: number,
  cellIndex: number,
) {
  if (hasSameStructuredTableGroup(rows[rowIndex], rows[rowIndex - 1], cellIndex)) {
    return 0;
  }

  let rowSpan = 1;
  for (let nextIndex = rowIndex + 1; nextIndex < rows.length; nextIndex += 1) {
    if (!hasSameStructuredTableGroup(rows[rowIndex], rows[nextIndex], cellIndex)) break;
    rowSpan += 1;
  }

  return rowSpan;
}

function hasSameStructuredTableGroup(
  current: { cells: string[] } | undefined,
  target: { cells: string[] } | undefined,
  cellIndex: number,
) {
  if (!current || !target) return false;

  for (let index = 0; index <= cellIndex; index += 1) {
    if ((current.cells[index] || "") !== (target.cells[index] || "")) return false;
  }

  return true;
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-slate-950"
        placeholder={placeholder}
      />
    </Field>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;

  return (
    <p>
      <span className="font-black text-slate-500">{label}: </span>
      {value}
    </p>
  );
}

function Pill({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "amber";
}) {
  const className =
    tone === "amber"
      ? "bg-amber-50 text-amber-700"
      : "bg-slate-100 text-slate-500";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>{children}</span>;
}

function createStudentFromForm(form: FormState): TeacherStudentItem | null {
  const name = form.name.trim();
  const school = form.school.trim();
  const latestCareerGoal = form.latestCareerGoal.trim();

  if (!name || !school || !latestCareerGoal) return null;

  return {
    id: `LOCAL-${Date.now()}`,
    name,
    gender: form.gender,
    region: form.region.trim(),
    schoolLevel: form.schoolLevel,
    grade: Number(form.grade),
    school,
    latestCareerGoal,
    careerTrack: form.careerTrack.trim(),
    personalityData: form.personalityData.trim(),
    diagnosisData: form.diagnosisData.trim(),
    nearbyMiddleSchools: toList(form.nearbyMiddleSchools),
    studentCharacteristics: form.studentCharacteristics.trim(),
    schoolSpecialInfo: form.schoolSpecialInfo.trim(),
    schoolWebInfo: form.schoolWebInfo.trim(),
    lastAnalyzedAt: new Date().toISOString(),
    status: "needs_update",
    latestMemo: form.memo.trim() || "아직 관찰 메모가 없습니다.",
    hasReport: true,
    source: "local",
  };
}

function updateStudentFromForm(student: TeacherStudentItem, form: FormState): TeacherStudentItem | null {
  const name = form.name.trim();
  const school = form.school.trim();
  const latestCareerGoal = form.latestCareerGoal.trim();

  if (!name || !school || !latestCareerGoal) return null;

  return {
    ...student,
    name,
    gender: form.gender,
    region: form.region.trim(),
    schoolLevel: form.schoolLevel,
    grade: Number(form.grade),
    school,
    latestCareerGoal,
    careerTrack: form.careerTrack.trim(),
    personalityData: form.personalityData.trim(),
    diagnosisData: form.diagnosisData.trim(),
    nearbyMiddleSchools: toList(form.nearbyMiddleSchools),
    studentCharacteristics: form.studentCharacteristics.trim(),
    schoolSpecialInfo: form.schoolSpecialInfo.trim(),
    schoolWebInfo: form.schoolWebInfo.trim(),
    latestMemo: form.memo.trim() || "아직 관찰 메모가 없습니다.",
    lastAnalyzedAt: new Date().toISOString(),
    status: student.source === "mock" ? "needs_update" : student.status,
  };
}

function toFormState(student: TeacherStudentItem): FormState {
  return {
    name: student.name,
    gender: student.gender,
    region: student.region,
    schoolLevel: student.schoolLevel,
    grade: String(student.grade),
    school: student.school,
    latestCareerGoal: student.latestCareerGoal,
    careerTrack: student.careerTrack,
    personalityData: student.personalityData,
    diagnosisData: student.diagnosisData,
    nearbyMiddleSchools: student.nearbyMiddleSchools.join(", "),
    studentCharacteristics: student.studentCharacteristics,
    schoolSpecialInfo: student.schoolSpecialInfo,
    schoolWebInfo: student.schoolWebInfo,
    memo: student.latestMemo,
  };
}

function toTeacherStudentItem(student: StudentRecord): TeacherStudentItem {
  return {
    id: student.id,
    name: student.name,
    gender: "",
    region: "",
    schoolLevel: student.schoolLevel,
    grade: student.grade,
    school: student.school,
    latestCareerGoal: student.latestCareerGoal,
    careerTrack: "",
    personalityData: "",
    diagnosisData: "",
    nearbyMiddleSchools: [],
    studentCharacteristics: "",
    schoolSpecialInfo: "",
    schoolWebInfo: "",
    lastAnalyzedAt: student.lastAnalyzedAt,
    status: student.status,
    latestMemo: student.teacherObservations.at(-1)?.memo ?? "기록 없음",
    // Legacy 김민준 결과 화면은 현재 노출하지 않습니다.
    hasReport: student.id !== "STU-2401",
    source: "mock",
  };
}

function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePersonalityData(value: string): PersonalityData {
  return normalizePersonalityData(parseJson(value));
}

function parseDiagnosisData(value: string): DiagnosisData {
  return normalizeDiagnosisData(parseJson(value));
}

function parseTeacherNoteData(value: string): TeacherNoteRecord[] {
  const parsed = parseJson(value);
  if (isRecord(parsed) && Array.isArray(parsed.records)) {
    return parsed.records.flatMap((record) => {
      if (!isRecord(record)) return [];

      const category = toStringValue(record.category);
      const content = toStringValue(record.content);
      return category || content ? [{ category: category || "기존 입력", content }] : [];
    });
  }

  const content = value.trim();
  return content ? [{ category: "기존 입력", content }] : [];
}

function formatTeacherNoteSummary(value: string) {
  const records = parseTeacherNoteData(value);

  if (!records.length) return "";

  return records
    .slice(0, 3)
    .map((record) => `${record.category}: ${record.content}`)
    .join(" / ");
}

function parseSchoolSpecialInfoData(value: string): SchoolSpecialInfoRecord[] {
  const parsed = parseJson(value);
  if (isRecord(parsed) && Array.isArray(parsed.records)) {
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

  const content = value.trim();
  return content ? [{ schoolName: "-", category: "기존 입력", content }] : [];
}

function parseSchoolWebInfoData(value: string): SchoolWebInfoRecord[] {
  const parsed = parseJson(value);
  if (isRecord(parsed) && Array.isArray(parsed.records)) {
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

  const content = value.trim();
  return content ? [{ schoolName: "-", type: "기존 입력", content }] : [];
}

function parseJson(value: string): unknown {
  if (!value.trim()) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function stringifyData(value: unknown) {
  return JSON.stringify(value);
}

function stringifyRecords(records: unknown[]) {
  return JSON.stringify({ records });
}

function normalizePersonalityData(value: unknown): PersonalityData {
  if (!isRecord(value)) return createEmptyPersonalityData();

  if (Array.isArray(value.records)) {
    return {
      records: value.records.flatMap((record) => {
        if (!isRecord(record)) return [];

        return [{
          period: toStringValue(record.period),
          qualitativeValue: toStringValue(record.qualitativeValue),
          quantitativeValue: toStringValue(record.quantitativeValue),
          quantitativeDetails: normalizeQuantitativeDetails(record.quantitativeDetails),
        }];
      }),
    };
  }

  if (isRecord(value.qualitative)) {
    return {
      records: Object.keys(value.qualitative).length
        ? [...personalityPeriods].map((period) => ({
          period,
          qualitativeValue: personalityQualRows
            .map((row) => {
              const rowValue = readGridValue(value.qualitative, row, period);
              return rowValue ? `${row}: ${rowValue}` : "";
            })
            .filter(Boolean)
            .join(" / "),
          quantitativeValue: isRecord(value.scale)
            ? Object.keys(value.scale)
              .map((row) => {
                const rowValue = readGridValue(value.scale, row, period);
                return rowValue ? `${row}: ${rowValue}` : "";
              })
              .filter(Boolean)
              .join(" / ")
            : "",
          quantitativeDetails: isRecord(value.scale)
            ? Object.keys(value.scale).flatMap((row) => {
              const rowValue = readGridValue(value.scale, row, period);
              return rowValue ? [{ group: row, category: row, value: rowValue }] : [];
            })
            : [],
        })).filter((record) => record.qualitativeValue || record.quantitativeValue)
        : [],
    };
  }

  return createEmptyPersonalityData();
}

function normalizeDiagnosisData(value: unknown): DiagnosisData {
  if (!isRecord(value)) return createEmptyDiagnosisData();

  if (Array.isArray(value.records)) {
    return {
      records: value.records.flatMap((record) => {
        if (!isRecord(record)) return [];

        return [{
          period: toStringValue(record.period),
          korean: toStringValue(record.korean),
          english: toStringValue(record.english),
          math: toStringValue(record.math),
          curriculumDetail: toStringValue(record.curriculumDetail),
          curriculumDetails: normalizeCurriculumDetails(record.curriculumDetails),
        }];
      }),
    };
  }

  if (isRecord(value.totalScores)) {
    const periods = new Set<string>();
    Object.values(value.totalScores).forEach((row) => {
      if (isRecord(row)) {
        Object.keys(row).forEach((period) => periods.add(period));
      }
    });

    return {
      records: Array.from(periods).map((period) => ({
        period,
        korean: readGridValue(value.totalScores, "국어", period),
        english: readGridValue(value.totalScores, "영어", period),
        math: readGridValue(value.totalScores, "수학", period),
        curriculumDetail: "",
        curriculumDetails: [],
      })),
    };
  }

  return {
    records: [],
  };
}

function createEmptyPersonalityData(): PersonalityData {
  return {
    records: [],
  };
}

function createEmptyDiagnosisData(): DiagnosisData {
  return {
    records: [],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

function formatCurriculumDetails(details: CurriculumDetail[]) {
  return details.map((detail) => `${detail.subject} ${detail.category}: ${detail.value}`).join("\n");
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

function formatQuantitativeDetails(details: QuantitativeDetail[]) {
  return details.map((detail) => `${detail.group} / ${detail.category}: ${detail.value}`).join("\n");
}

function toStringValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function readLocalStudents() {
  const stored = window.localStorage.getItem(localStorageKey);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as TeacherStudentItem[];
    return parsed.map(normalizeStoredStudent);
  } catch {
    window.localStorage.removeItem(localStorageKey);
    return [];
  }
}

function readStudentEdits() {
  const stored = window.localStorage.getItem(editsStorageKey);
  if (!stored) return {};

  try {
    const parsed = JSON.parse(stored) as Record<string, TeacherStudentItem>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, normalizeStoredStudent(value)]),
    );
  } catch {
    window.localStorage.removeItem(editsStorageKey);
    return {};
  }
}

function normalizeStoredStudent(student: TeacherStudentItem): TeacherStudentItem {
  return {
    ...student,
    gender: student.gender ?? "",
    region: student.region ?? "",
    careerTrack: student.careerTrack ?? "",
    personalityData: student.personalityData ?? "",
    diagnosisData: student.diagnosisData ?? "",
    nearbyMiddleSchools: Array.isArray(student.nearbyMiddleSchools) ? student.nearbyMiddleSchools : [],
    studentCharacteristics: student.studentCharacteristics ?? "",
    schoolSpecialInfo: student.schoolSpecialInfo ?? "",
    schoolWebInfo: student.schoolWebInfo ?? "",
  };
}
