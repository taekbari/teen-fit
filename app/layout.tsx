import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://teen-fit.vercel.app"),
  title: {
    default: "Teen-Fit",
    template: "%s | Teen-Fit",
  },
  description:
    "초등 고학년부터 중학생을 위한 AI 진로·입시 러닝메이트 MVP",
  applicationName: "Teen-Fit",
  keywords: ["Teen-Fit", "틴핏", "진로", "입시", "학습 대시보드"],
  authors: [{ name: "Teen-Fit" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Teen-Fit",
    description: "데이터로 증명하는 힙한 입시 러닝메이트",
    siteName: "Teen-Fit",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#18c29c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
