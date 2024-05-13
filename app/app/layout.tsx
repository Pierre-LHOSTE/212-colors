import Header from "@/src/components/app/header/Header";
import MainAside from "@/src/components/mainAside/MainAside";
import NavAside from "@/src/components/navAside/NavAside";
import { Inter } from "next/font/google";
import "overlayscrollbars/overlayscrollbars.css";
import "./globals.scss";
import "./layout.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="app-window">
      <MainAside projects={[]} />
      <NavAside />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
