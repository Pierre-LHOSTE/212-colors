"use client";
import { updateSection } from "@/src/api/project";
import { SectionNameType, SectionType } from "@/src/types/section";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import MainCard from "../card/MainCard";

function FormSection({
  id,
  sections,
}: {
  id: string;
  sections: SectionType[];
}) {
  const [localSections, setLocalSections] = useState(sections);

  async function handleChange(e: CheckboxChangeEvent, name: SectionNameType) {
    const res = await updateSection({
      id,
      section: { name, active: e.target.checked },
    });
    if ("error" in res) {
      console.error(res.message);
      return;
    }
    setLocalSections((prevState) =>
      prevState.map((section) =>
        section.name === name
          ? { ...section, active: e.target.checked }
          : section
      )
    );
  }

  return (
    <MainCard title="Active sections">
      {localSections.map((section) => (
        <Checkbox
          key={section.name}
          checked={section.active}
          onChange={(e) => handleChange(e, section.name as SectionNameType)}
          style={{
            textTransform: "capitalize",
          }}
        >
          {section.name.split("Section")[0] + "s"}
        </Checkbox>
      ))}
    </MainCard>
  );
}

export default FormSection;
