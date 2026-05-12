import { PageFrame } from "@/components/AppShell";
import { OnboardingForm } from "@/components/OnboardingForm";

export default function OnboardingPage() {
  return (
    <PageFrame
      eyebrow="Step 1"
      title="학생 프로필 만들기"
      description="목표학교, 관심 진로, 좋아하는 활동을 입력하면 틴핏이 진단의 기준점을 잡습니다."
    >
      <OnboardingForm />
    </PageFrame>
  );
}
