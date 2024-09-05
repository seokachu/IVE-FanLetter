import type { Metadata } from "next";
import { notoSansKr } from "@/assets/fonts/font";
import "@/styles/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QueryProvider from "@/components/layout/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

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
      <body className={notoSansKr.className}>
        <ToastContainer position="top-left" autoClose={1000} />
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
