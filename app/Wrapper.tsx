"use client";

import darkTheme from "@/src/themes/dark";
import lightTheme from "@/src/themes/light";
import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
}
