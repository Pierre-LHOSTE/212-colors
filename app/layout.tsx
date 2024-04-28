import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Wrapper from "./Wrapper";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "212-Colors",
  description: "212-Colors, a color management app made for school project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="app-window">
          <Wrapper>{children}</Wrapper>
        </div>
      </body>
    </html>
  );
}
