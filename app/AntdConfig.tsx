"use client";
import darkTheme from "@/src/themes/dark";
import lightTheme from "@/src/themes/light";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

export function AntdConfig({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const themeChangeListener = (e: MediaQueryListEvent) =>
      setIsDarkTheme(e.matches);
    setIsDarkTheme(darkThemeMediaQuery.matches);
    darkThemeMediaQuery.addEventListener("change", themeChangeListener);
    return () =>
      darkThemeMediaQuery.removeEventListener("change", themeChangeListener);
  }, []);

  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
}
