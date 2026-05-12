import { PageFrame, Notice } from "@/components/AppShell";
import { DiagnosisForm } from "@/components/DiagnosisForm";

export default function DiagnosisPage() {
  return (
    <PageFrame
      eyebrow="Step 2"
      title="초기진단"
      description="내신 점수와 학습 성향을 바탕으로 목표학교까지의 현재 위치를 mock 분석합니다."
    >
      <Notice />
      <DiagnosisForm />
    </PageFrame>
  );
}
