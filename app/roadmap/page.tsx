import { PageFrame, Notice } from "@/components/AppShell";
import { RoadmapView } from "@/components/RoadmapView";

export default function RoadmapPage() {
  return (
    <PageFrame
      eyebrow="Roadmap"
      title="중학교에서 대학교까지 이어지는 준비 흐름"
      description="단계별 활동, 학습 중점, 입시 퀘스트를 목표학교 기준으로 정리했습니다."
    >
      <Notice />
      <RoadmapView />
    </PageFrame>
  );
}
