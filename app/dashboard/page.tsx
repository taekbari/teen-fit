import { PageFrame } from "@/components/AppShell";
import { DashboardView } from "@/components/DashboardView";

export default function DashboardPage() {
  return (
    <PageFrame
      eyebrow="Teen-Fit Dashboard"
      title="나의 입시 자산 현황"
      description="목표 달성도, 핵심 스탯, 추천 미션을 한 화면에서 확인합니다."
    >
      <DashboardView />
    </PageFrame>
  );
}
