"use client";
import { createProject } from "@/src/api/project";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ProjectType } from "@/src/types/project";
import { Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ProjectFormSchema } from "./ProjectFormSchema";

const rule = createSchemaFieldRule(ProjectFormSchema);

export default function CreateProjectModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const { LL } = useI18nContext();

  function onSubmit(values: ProjectType) {
    startTransition(async () => {
      const res = await createProject(values);
      if ("id" in res) {
        if (modalState.updateStateCallBack) {
          const { id, name, position } = res;
          modalState.updateStateCallBack({
            id,
            name,
            position,
          });
        }
        setModalState({
          id: "",
        });
        setMessage({
          type: "success",
          content: "Project created successfully",
        });
        form.resetFields();
      } else {
        handleError(res, "Failed to create project");
      }
    });
  }

  return (
    <FormModal
      title={LL.project.modal.new.title()}
      isOpen={modalState.id === "project"}
      mode={modalState.mode}
      closeModal={() =>
        setModalState({
          id: "",
        })
      }
      submitForm={() => form.submit()}
      loading={isPending}
    >
      <Form
        layout="vertical"
        name="new-project-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label={LL.project.modal.new.name()}
          name="name"
          rules={[rule]}
        >
          <Input />
        </Form.Item>
      </Form>
    </FormModal>
  );
}
