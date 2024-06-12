"use client";
import { updateSection } from "@/src/api/project";
import { useDataStore } from "@/src/store/data";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import MainCard from "../card/MainCard";

const sections = ["colors", "themes"];

function FormSection({ id }: { id: string }) {
  const hiddenSections = useDataStore((state) => state.project.hiddenSections);
  const setHiddenSections = useDataStore((state) => state.setHiddenSections);

  async function handleChange(e: CheckboxChangeEvent, name: string) {
    const newHiddenSections = e.target.checked
      ? hiddenSections.filter((section) => section !== name)
      : [...hiddenSections, name];
    const res = await updateSection({
      id,
      sections: newHiddenSections,
    });
    if ("error" in res) {
      console.error(res.message);
      return;
    }
    setHiddenSections((prevState) =>
      e.target.checked
        ? prevState.filter((section) => section !== name)
        : [...prevState, name],
    );
  }

  return (
    <MainCard title="Active sections">
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

export default FormSection;
