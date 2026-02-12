import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f23",
};

export const metadata: Metadata = {
  title: "Gift Genie - 센스쟁이 | AI 선물 추천",
  description:
    "고민 끝! AI가 찾아주는 완벽한 선물. 상황과 대상에 딱 맞는 센스있는 선물 추천 서비스",
  keywords: ["선물 추천", "AI 선물", "센스쟁이", "생일 선물", "기념일 선물", "Gift Genie"],
  authors: [{ name: "Gift Genie" }],
  openGraph: {
    title: "Gift Genie - 센스쟁이 | AI 선물 추천",
    description: "고민 끝! AI가 찾아주는 완벽한 선물",
    siteName: "Gift Genie",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Genie - 센스쟁이",
    description: "고민 끝! AI가 찾아주는 완벽한 선물",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
