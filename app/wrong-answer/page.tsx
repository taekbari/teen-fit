import { PageFrame } from "@/components/AppShell";
import { WrongAnswerDemo } from "@/components/WrongAnswerDemo";

export default function WrongAnswerPage() {
  return (
    <PageFrame
      eyebrow="Wrong Answer Scan"
      title="오답스캔 데모"
      description="이미지를 올리면 OCR 없이 함수 대입법 중심의 mock 피드백을 보여줍니다."
    >
      <WrongAnswerDemo />
    </PageFrame>
  );
}
