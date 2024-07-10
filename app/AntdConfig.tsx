"use client";
import { useSettingsStore } from "@/src/store/settings";
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
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const updateTheme = () => {
      if (theme === "dark") {
        setIsDarkTheme(true);
      } else if (theme === "light") {
        setIsDarkTheme(false);
      } else {
        setIsDarkTheme(darkThemeMediaQuery.matches);
      }
    };

    const themeChangeListener = (e: MediaQueryListEvent) => {
      if (theme === "auto") {
        setIsDarkTheme(e.matches);
      }
    };

    updateTheme(); // Initial theme setup
    darkThemeMediaQuery.addEventListener("change", themeChangeListener);

    document.body.classList.remove("dark-theme");
    document.body.classList.remove("light-theme");
    document.body.classList.remove("auto-theme");
    document.body.classList.add(`${theme}-theme`);

    return () => {
      darkThemeMediaQuery.removeEventListener("change", themeChangeListener);
    };
  }, [theme]);

  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
}
