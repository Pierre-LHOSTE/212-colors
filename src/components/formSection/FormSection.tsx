"use client";
import { updateSection } from "@/src/api/project";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import MainCard from "../card/MainCard";

const sections = ["colors", "themes"];

export default function FormSection({ id }: { id: string }) {
  const hiddenSections = useDataStore((state) => state.project.hiddenSections);
  const setHiddenSections = useDataStore((state) => state.setHiddenSections);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const { LL } = useI18nContext();

  async function handleChange(e: CheckboxChangeEvent, name: string) {
    const newHiddenSections = e.target.checked
      ? hiddenSections.filter((section) => section !== name)
      : [...hiddenSections, name];
    const res = await updateSection({
      id,
      sections: newHiddenSections,
    });
    if ("error" in res) {
      handleError(res, "Failed to update section");
    }
    setMessage({
      type: "success",
      content: "Section updated",
    });
    setHiddenSections((prevState) =>
      e.target.checked
        ? prevState.filter((section) => section !== name)
        : [...prevState, name]
    );
  }

  return (
    <MainCard title={LL.project.info.activeSections.title()}>
      {sections.map((section) => (
        <Checkbox
          key={section}
          checked={!hiddenSections.includes(section)}
          onChange={(e) => handleChange(e, section)}
          style={{
            textTransform: "capitalize",
          }}
        >
          {section.split("Section")[0]}
        </Checkbox>
      ))}
    </MainCard>
  );
}
