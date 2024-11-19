"use client";
import { theme } from "antd";
import "./header.scss";

const { useToken } = theme;

export default function Header() {
  const { token } = useToken();
  return (
    <header
      id="header"
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    />
  );
}
