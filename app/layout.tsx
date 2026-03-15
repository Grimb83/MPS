import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Sheet Gantt Manager",
  description: "Google Sheets 기반 지능형 일정 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
