"use client";
import { updateSection } from "@/src/api/project";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import MainCard from "../card/MainCard";

const sections = ["colors", "themes"];

function FormSection({
  id,
  hiddenSections,
}: {
  id: string;
  hiddenSections: string[];
}) {
  const [localHiddenSections, setLocalHiddenSections] =
    useState(hiddenSections);

  async function handleChange(e: CheckboxChangeEvent, name: string) {
    const newHiddenSections = e.target.checked
      ? localHiddenSections.filter((section) => section !== name)
      : [...localHiddenSections, name];
    const res = await updateSection({
      id,
      sections: newHiddenSections,
    });
    if ("error" in res) {
      console.error(res.message);
      return;
    }
    setLocalHiddenSections((prevState) =>
      e.target.checked
        ? prevState.filter((section) => section !== name)
        : [...prevState, name]
    );
  }

  return (
    <MainCard title="Active sections">
      {sections.map((section) => (
        <Checkbox
          key={section}
          checked={!localHiddenSections.includes(section)}
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

export default FormSection;
