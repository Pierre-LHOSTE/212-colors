import { useDataStore } from "@/src/store/data";
import { Form } from "antd";
import { FormInstance, RuleRender } from "antd/es/form";
import React from "react";
import AiPopover from "../aiPopover/AiPopover";

export default function AiFormItem({
  name,
  label,
  rule,
  children,
  form,
  category,
}: {
  name: "name" | "description" | "color";
  label: string;
  rule: RuleRender;
  children: React.ReactNode;
  form: FormInstance;
  category: "color" | "theme";
}) {
  const project = useDataStore((state) => state.project);

  return (
    <>
      <Form.Item label={label}>
        <div style={{ display: "flex", gap: "8px" }}>
          <Form.Item
            name={name}
            rules={[rule]}
            style={{ flex: 1, marginBottom: 0 }}
          >
            {children}
          </Form.Item>
          {project.owner.premium ? (
            <AiPopover category={category} type={name} form={form} />
          ) : null}
        </div>
      </Form.Item>
    </>
  );
}
