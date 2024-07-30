"use client";
import { useSettingsStore } from "@/src/store/settings";
import { useThemeStore } from "@/src/store/theme";
import darkTheme from "@/src/themes/dark";
import lightTheme from "@/src/themes/light";
import { ConfigProvider, ThemeConfig } from "antd";
import { useEffect, useState } from "react";

export function AntdConfig({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = useSettingsStore((state) => state.theme);
  const primaryColor = useThemeStore((state) => state.primaryColor);

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
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

    updateTheme();
    darkThemeMediaQuery.addEventListener("change", themeChangeListener);

    document.body.classList.remove("dark-theme");
    document.body.classList.remove("light-theme");
    document.body.classList.remove("auto-theme");
    document.body.classList.add(`${theme}-theme`);

    return () => {
      darkThemeMediaQuery.removeEventListener("change", themeChangeListener);
    };
  }, [theme]);

  if (!primaryColor) return children;

  const adaptedDarkTheme = {
    ...darkTheme,
    token: {
      ...darkTheme.token,
      colorInfo: primaryColor,
      colorPrimary: primaryColor,
    },
  } as ThemeConfig;

  const adaptedLightTheme = {
    ...lightTheme,
    token: {
      ...lightTheme.token,
      colorInfo: primaryColor,
      colorPrimary: primaryColor,
    },
  } as ThemeConfig;

  return (
    <ConfigProvider theme={isDarkTheme ? adaptedDarkTheme : adaptedLightTheme}>
      {children}
    </ConfigProvider>
  );
}
