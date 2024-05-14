import MainAside from "@/src/components/mainAside/MainAside";
import { Inter } from "next/font/google";
import "overlayscrollbars/overlayscrollbars.css";
import "./layout.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="app-window">
      <MainAside />
      {children}
    </div>
  );
}
