"use client";
import { Layout, theme } from "antd";
const { useToken } = theme;

export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useToken();

  return (
    <Layout
      id="app-window"
      style={{
        backgroundColor: token.colorBgBase,
      }}
    >
      {children}
    </Layout>
  );
}
