"use client";
import { Checkbox, Select } from "antd";
import MainCard from "../card/MainCard";
import "./settings-card.scss";
import { useSettingsStore } from "@/src/store/settings";

export default function SettingsCard() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <MainCard
      id="settings-card"
      sections={[
        {
          title: "Language",
          children: (
            <Select
              value={language}
              onChange={(value) => setLanguage(value)}
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
                onChange={(value) => setTheme(value)}
                options={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                  {
                    label: "System",
                    value: "auto",
                  },
                ]}
              />
              <Checkbox>Appliqué le theme du projet</Checkbox>
            </>
          ),
        },
      ]}
    />
  );
}
