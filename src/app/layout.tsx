import type { Metadata } from "next";
import { notoSansKr } from "@/assets/fonts/font";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "IVE 팬페이지",
  description: "IVE-아이브에게 응원의 메세지를 남겨주세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>{children}</body>
    </html>
  );
}
