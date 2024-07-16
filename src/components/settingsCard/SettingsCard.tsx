"use client";
import { updateSettings } from "@/src/api/settings";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useSettingsStore } from "@/src/store/settings";
import type { ThemeType } from "@/src/types/settings";
import { Select } from "antd";
import { useTransition } from "react";
import MainCard from "../card/MainCard";
import "./settings-card.scss";

export default function SettingsCard() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const [isThemePending, startThemeTransition] = useTransition();
  const [isLangPending, startLangTransition] = useTransition();
  const { LL } = useI18nContext();

  async function updateTheme(values: ThemeType) {
    startThemeTransition(async () => {
      const res = await updateSettings({ theme: values });
      if ("error" in res) {
        return handleError(res, "Failed to update theme");
      }
      setTheme(values);
      setMessage({
        type: "success",
        content: "Theme settings updated successfully",
      });
    });
  }

  async function updateLanguage(value: string) {
    startLangTransition(async () => {
      const res = await updateSettings({ language: value });
      if ("error" in res) {
        return handleError(res, "Failed to update language");
      }
      setLanguage(value);
      setMessage({
        type: "success",
        content: "Language settings updated successfully",
      });
      window.dispatchEvent(new Event("languageChange"));
    });
  }

  const languageOptions = [
    {
      label: LL.profile.themes.auto(),
      value: "auto",
    },
    { label: "English", value: "en" },
    { label: "Français", value: "fr" },
  ];

  if (process.env.NODE_ENV === "development")
    languageOptions.push({ label: "Debug", value: "debug" });

  return (
    <MainCard
      id="settings-card"
      sections={[
        {
          title: LL.profile.settings.language(),
          children: (
            <Select
              loading={isLangPending}
              value={language}
              onChange={updateLanguage}
              options={languageOptions}
            />
          ),
        },
        {
          title: LL.profile.settings.theme(),
          children: (
            <>
              <Select
                loading={isThemePending}
                value={theme}
                onChange={updateTheme}
                options={[
                  { label: LL.profile.themes.light(), value: "light" },
                  { label: LL.profile.themes.dark(), value: "dark" },
                  {
                    label: LL.profile.themes.auto(),
                    value: "auto",
                  },
                ]}
              />
              {/* <Checkbox>Appliqué le theme du projet</Checkbox> */}
            </>
          ),
        },
      ]}
    />
  );
}
