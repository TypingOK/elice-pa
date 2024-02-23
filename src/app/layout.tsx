import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "엘카데미 | AI시대 생존을 위한 첫 사수!",
  description:
    "코딩교육 1위, 만족도 4.82점 엘카데미에서 차원이 다른 코딩교육을 경험해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Provider>
          <div className="flex justify-center w-full h-full">
            <div className="max-w-[1280px] p-6 w-full h-full">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
