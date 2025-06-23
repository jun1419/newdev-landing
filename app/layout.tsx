import type { Metadata } from "next";
import "./globals.css";
import MouseCursor from "./components/MouseCursor";

export const metadata: Metadata = {
  title: "뉴데브 | 혁신적인 IT 솔루션",
  description: "웹/앱 개발부터 MVP 구축까지, 당신의 아이디어를 현실로 만들어드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
        />

      </head>
      <body>
        <MouseCursor />
        {children}
      </body>
    </html>
  );
}
