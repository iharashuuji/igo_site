import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "大阪公立大学（ハム大）囲碁部 公式Webサイト 部活 ",
  description: "初心者から有段者まで歓迎！大学囲碁部の公式Webサイトです。活動内容、ブログ、入部案内などを掲載しています。",

  // 3. これがGoogle Search Consoleの認証コード！
  verification: {
    google: "oGyos_2f2uiAwC00C2B63QkwDzFAjkDkf89dMhgECKU", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
