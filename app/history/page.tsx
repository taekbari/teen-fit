import { PageFrame } from "@/components/AppShell";
import { HistoryView } from "@/components/HistoryView";

export default function HistoryPage() {
  return (
    <PageFrame
      eyebrow="History"
      title="진단 히스토리"
      description="localStorage에 저장된 진단 결과와 관심 진로 변화 흐름을 확인합니다."
    >
      <HistoryView />
    </PageFrame>
  );
}
