import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RA2111026020004",
  description: "Made by Chanakyha.V (RA2111026020004)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
