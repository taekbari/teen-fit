import type {
  DiagnosisSnapshot,
  PersonalitySnapshot,
  SchoolGradeData,
  StudentRecord,
  SubjectAssessmentRecord,
  SubjectScore,
} from "@/types/student";

export function Card({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {title ? <h2 className="text-xl font-black text-slate-950">{title}</h2> : null}
      {description ? <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">{description}</p> : null}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: StudentRecord["status"] }) {
  const label = {
    ready: "분석 완료",
    needs_update: "업데이트 필요",
    in_progress: "분석 중",
  }[status];

  const className = {
    ready: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    needs_update: "bg-amber-50 text-amber-700 ring-amber-100",
    in_progress: "bg-blue-50 text-blue-700 ring-blue-100",
  }[status];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${className}`}>
      {label}
    </span>
  );
}

export function ScoreBars({
  scores,
}: {
  scores: Array<{ label: string; value: number }>;
}) {
  return (
    <div className="grid gap-3">
      {scores.map((score) => (
        <div key={score.label}>
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-slate-600">{score.label}</span>
            <span className="text-slate-950">{fallbackNumber(score.value)}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-950"
              style={{ width: `${fallbackNumber(score.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DiagnosisTrend({ items }: { items: DiagnosisSnapshot[] }) {
  const metrics = [
    ["aptitude", "적성", "#0f172a"],
    ["learningReadiness", "학습", "#10b981"],
    ["careerClarity", "진로", "#6366f1"],
    ["selfManagement", "관리", "#f59e0b"],
  ] as const;

  return (
    <div className="grid gap-5">
      <LineChartFrame labels={items.map((item) => item.period)}>
        {metrics.map(([key, label, color]) => (
          <polyline
            key={key}
            points={toChartPoints(items.map((item) => item.scores[key]))}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <title>{label}</title>
          </polyline>
        ))}
        {metrics.flatMap(([key, label, color]) =>
          toPointList(items.map((item) => item.scores[key])).map((point) => (
            <circle key={`${key}-${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" fill={color}>
              <title>{label}</title>
            </circle>
          )),
        )}
      </LineChartFrame>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map(([key, label, color]) => {
          const first = items[0]?.scores[key] ?? 0;
          const last = items.at(-1)?.scores[key] ?? 0;
          const diff = last - first;

          return (
            <div key={key} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-700">{label}</span>
                <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
              </div>
              <p className="mt-2 text-2xl font-black">{last}</p>
              <p className={`mt-1 text-xs font-black ${diff >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {diff >= 0 ? "+" : ""}
                {diff}p
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.period} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900">{item.period}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SubjectGrowthChart({ items }: { items: SubjectScore[] }) {
  const subjects = [
    ["korean", "국어", "#3b82f6"],
    ["english", "영어", "#10b981"],
    ["math", "수학", "#8b5cf6"],
  ] as const;

  return (
    <div className="grid gap-5">
      <LineChartFrame labels={items.map((item) => item.period)}>
        {subjects.map(([key, label, color]) => (
          <polyline
            key={key}
            points={toChartPoints(items.map((item) => item[key]))}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          >
            <title>{label}</title>
          </polyline>
        ))}
        {subjects.flatMap(([key, label, color]) =>
          toPointList(items.map((item) => item[key])).map((point) => (
            <circle key={`${key}-${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" fill={color}>
              <title>{label}</title>
            </circle>
          )),
        )}
      </LineChartFrame>

      <div className="grid grid-cols-3 gap-3">
        {subjects.map(([key, label, color]) => {
          const first = items[0]?.[key] ?? 0;
          const last = items.at(-1)?.[key] ?? 0;
          const diff = last - first;

          return (
            <div key={key} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-black text-slate-700">{label}</span>
              </div>
              <p className="mt-3 text-2xl font-black">{last}</p>
              <p className={`mt-1 text-xs font-black ${diff >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {first} → {last} ({diff >= 0 ? "+" : ""}
                {diff})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PersonalityAssessmentPanel({
  items,
}: {
  items: PersonalitySnapshot[];
}) {
  const latest = items.at(-1);

  if (!items.length || !latest) {
    return (
      <div className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
        성향검사 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-3 lg:grid-cols-3">
        {items.map((item) => (
          <div key={`${item.year}-${item.stage ?? item.type.primary}`} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-slate-400">{item.year}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950">
                  {item.stage ?? `${item.year}년`}
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                {item.type.primary}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <PersonalityTextRow label="관심 과목" value={item.qualitative?.mainInterestSubjects} />
              <PersonalityTextRow label="학습 태도" value={item.qualitative?.learningAttitude ?? item.note} />
              <PersonalityTextRow label="핵심 강점" value={item.qualitative?.coreStrength} />
              <PersonalityTextRow label="지도 핵심" value={item.qualitative?.coachingFocus} />
            </dl>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-slate-950 p-5 text-white">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black text-emerald-300">Latest personality scale</p>
            <h3 className="mt-1 text-2xl font-black">
              {latest.stage ?? `${latest.year}년`} 성향검사 결과 상세
            </h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">
            {latest.type.primary} / {latest.type.secondary}
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {(latest.axisScores ?? []).map((axis) => (
            <PersonalityAxisBar key={axis.category} axis={axis} />
          ))}
        </div>

        {latest.preferences?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {latest.preferences.map((preference) => (
              <span
                key={preference.category}
                className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-slate-100"
              >
                {preference.category}: {preference.value}
              </span>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function PersonalityTextRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-black text-slate-400">{label}</dt>
      <dd className="mt-1 leading-6 text-slate-700">{value || "데이터 없음"}</dd>
    </div>
  );
}

function PersonalityAxisBar({
  axis,
}: {
  axis: NonNullable<PersonalitySnapshot["axisScores"]>[number];
}) {
  const total = axis.leftScore + axis.rightScore || 1;
  const leftPercent = Math.round((axis.leftScore / total) * 100);
  const rightPercent = 100 - leftPercent;

  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black text-white">{axis.category}</p>
          <p className="mt-1 text-xs font-bold text-slate-400">{axis.detail}</p>
        </div>
        <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">
          {axis.dominantLabel}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-full bg-white/10">
        <div className="flex h-3">
          <div className="bg-emerald-300" style={{ width: `${leftPercent}%` }} />
          <div className="bg-sky-300" style={{ width: `${rightPercent}%` }} />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs font-black text-slate-300">
        <span>
          {axis.leftLabel} {axis.leftScore}
        </span>
        <span>
          {axis.rightLabel} {axis.rightScore}
        </span>
      </div>
    </div>
  );
}

export function AssessmentDetailPanel({
  assessments,
}: {
  assessments: SubjectAssessmentRecord[];
}) {
  const subjects = ["국어", "영어", "수학"] as const;
  const bySubject = subjects.map((subject) => ({
    subject,
    items: assessments.filter((assessment) => assessment.subject === subject),
  }));

  return (
    <div className="grid gap-6">
      {bySubject.map(({ subject, items }) => {
        const first = items[0];
        const latest = items.at(-1);
        const diff = first && latest ? latest.totalScore - first.totalScore : 0;

        return (
          <details
            key={subject}
            className="group rounded-2xl border border-slate-200 bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 marker:hidden">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-slate-950">
                    {subject} 전체 평가 기록
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                    {items.length}회
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {first?.totalScore ?? "-"}점 → {latest?.totalScore ?? "-"}점
                  {first && latest ? ` (${diff >= 0 ? "+" : ""}${diff})` : ""}
                </p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-950 text-lg font-black text-white transition group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="grid gap-4 border-t border-slate-200 p-4 xl:grid-cols-2">
              {items.map((assessment) => (
                <AssessmentSemesterCard
                  key={`${assessment.subject}-${assessment.period}`}
                  assessment={assessment}
                />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export function SchoolGradeDetailPanel({ data }: { data: SchoolGradeData }) {
  const subjects = [
    { label: "국어", key: "korean" },
    { label: "영어", key: "english" },
    { label: "수학", key: "math" },
  ] as const;

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl bg-slate-950 p-5 text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-300">School record view</p>
            <h3 className="mt-1 text-2xl font-black">학기별 내신점수 종합</h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">
            {data.records.length}개 학기
          </span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[520px] overflow-hidden rounded-2xl border border-white/10">
            <div
              className="grid bg-white/10 text-xs font-black text-slate-300"
              style={{ gridTemplateColumns: `90px repeat(${data.records.length}, minmax(110px, 1fr))` }}
            >
              <div className="p-3">과목</div>
              {data.records.map((record) => (
                <div key={record.period} className="p-3 text-center">
                  {record.period}
                </div>
              ))}
            </div>
            {subjects.map((subject) => (
              <div
                key={subject.key}
                className="grid border-t border-white/10 text-sm"
                style={{ gridTemplateColumns: `90px repeat(${data.records.length}, minmax(110px, 1fr))` }}
              >
                <div className="p-3 font-black">{subject.label}</div>
                {data.records.map((record, index) => {
                  const previous = data.records[index - 1];
                  const score = record[subject.key];
                  const diff = previous ? score - previous[subject.key] : 0;

                  return (
                    <div key={`${subject.key}-${record.period}`} className="p-3 text-center">
                      <p className="font-black">{score}점</p>
                      {previous ? (
                        <p className={`mt-1 text-xs font-black ${diff >= 0 ? "text-emerald-300" : "text-amber-300"}`}>
                          {diff >= 0 ? "+" : ""}
                          {diff}p
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-slate-400">시작 학기</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {data.analysisComments.map((comment) => (
          <article key={comment.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-950">{comment.title}</h3>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{comment.description}</p>
          </article>
        ))}
      </section>

    </div>
  );
}

function AssessmentSemesterCard({
  assessment,
}: {
  assessment: SubjectAssessmentRecord;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-black text-slate-950">{assessment.period}</p>
          <p className="mt-1 text-sm font-bold text-slate-500">
            상위 {Math.round(assessment.topPercent * 100)}%
          </p>
        </div>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-white">
          {assessment.totalScore}점
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <div>
          <p className="text-xs font-black text-slate-500">영역별 성취도</p>
          <div className="mt-2 grid gap-2">
            {Object.entries(assessment.domains).map(([domain, value]) => (
              <MiniBar key={domain} label={domain} value={value} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black text-slate-500">난이도별 성취도</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <DifficultyCard label="상" value={assessment.difficultyAchievement.high} />
            <DifficultyCard label="중" value={assessment.difficultyAchievement.medium} />
            <DifficultyCard label="하" value={assessment.difficultyAchievement.low} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniBar({ label, value }: { label: string; value: number | null }) {
  const percent = value == null ? 0 : Math.round(value * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-400">{value == null ? "미평가" : `${percent}%`}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-slate-950"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function DifficultyCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{Math.round(value * 100)}%</p>
    </div>
  );
}

function LineChartFrame({
  labels,
  children,
}: {
  labels: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <svg viewBox="0 0 320 190" className="h-60 w-full">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="28" y1={y} x2="300" y2={y} stroke="#e2e8f0" strokeWidth="1" />
        ))}
        {children}
        {labels.map((label, index) => {
          const x = labels.length <= 1 ? 164 : 36 + index * (256 / (labels.length - 1));

          return (
            <text
              key={label}
              x={x}
              y="182"
              textAnchor="middle"
              className="fill-slate-400 text-[10px] font-bold"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function toChartPoints(values: number[]) {
  return toPointList(values)
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
}

function toPointList(values: number[]) {
  if (values.length === 0) return [];

  return values.map((rawValue, index) => {
    const value = fallbackNumber(rawValue);
    const x = values.length <= 1 ? 164 : 36 + index * (256 / (values.length - 1));
    const y = 164 - value * 1.28;

    return { x, y };
  });
}

export function Timeline({
  items,
}: {
  items: Array<{ date: string; title: string; description: string }>;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={`${item.date}-${item.title}`} className="grid grid-cols-[28px_1fr] gap-3">
          <div className="relative flex justify-center">
            <div className="z-10 mt-1 size-3 rounded-full bg-slate-950" />
            {index < items.length - 1 ? (
              <div className="absolute top-5 bottom-[-1rem] w-px bg-slate-200" />
            ) : null}
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-400">{formatDate(item.date)}</p>
            <p className="mt-1 font-black text-slate-950">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function formatSchool(level: StudentRecord["schoolLevel"], grade: number) {
  const label = {
    elementary: "초등학교",
    middle: "중학교",
    high: "고등학교",
  }[level];

  return `${label} ${grade}학년`;
}

export function formatDate(date: string) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function fallbackNumber(value: number) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0;
}
