import Message from "@/src/components/message/Message";
import Notification from "@/src/components/message/Notification";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "overlayscrollbars/overlayscrollbars.css";
import { AntdConfig } from "./AntdConfig";
import StyledComponentsRegistry from "./AntdRegistry";
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
        <StyledComponentsRegistry>
          <AntdConfig>
            {children}
            <>
              <Message />
              <Notification />
            </>
          </AntdConfig>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
