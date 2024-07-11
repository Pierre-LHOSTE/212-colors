"use client";
import { Select } from "antd";
import MainCard from "../card/MainCard";
import "./settings-card.scss";
import { useSettingsStore } from "@/src/store/settings";
import { handleError } from "@/src/lib/utils";
import { updateSettings } from "@/src/api/settings";
import type { ThemeType } from "@/src/types/settings";

export default function SettingsCard() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const setMessage = useSettingsStore((state) => state.setMessage);

  async function updateTheme(values: ThemeType) {
    const res = await updateSettings({ theme: values });
    if ("error" in res) {
      return handleError(res, "Failed to update theme");
    }
    setTheme(values);
    setMessage({
      type: "success",
      content: "Theme settings updated successfully",
    });
  }

  async function updateLanguage(value: string) {
    const res = await updateSettings({ language: value });
    if ("error" in res) {
      return handleError(res, "Failed to update language");
    }
    setLanguage(value);
    setMessage({
      type: "success",
      content: "Language settings updated successfully",
    });
  }

  return (
    <MainCard
      id="settings-card"
      sections={[
        {
          title: "Language",
          children: (
            <Select
              value={language}
              onChange={updateLanguage}
              options={[
                { label: "English", value: "en" },
                { label: "Français", value: "fr" },
              ]}
            />
          ),
        },
        {
          title: "Theme",
          children: (
            <>
              <Select
                value={theme}
                onChange={updateTheme}
                options={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                  {
                    label: "System",
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
