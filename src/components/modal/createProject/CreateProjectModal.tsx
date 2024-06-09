"use client";
import { createProject } from "@/src/api/project";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeType } from "@/src/types/theme";
import { Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTransition } from "react";
import FormModal from "../FormModal";
import { ProjectFormSchema } from "./ProjectFormSchema";

const rule = createSchemaFieldRule(ProjectFormSchema);

function CreateProjectModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();

  function onSubmit(values: ThemeType) {
    startTransition(async () => {
      const res = await createProject(values);
      if ("id" in res) {
        if (modalState.updateLocalState) {
          const { id, name, position } = res;
          modalState.updateLocalState({
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
          content: "Theme created",
        });
        form.resetFields();
      } else {
        setMessage({
          type: "error",
          content: "Failed to create theme",
        });
        setNotification({
          type: "error",
          message: "Error",
          description: <>{res.message || "An error occurred"}</>,
        });
      }
    });
  }

  return (
    <FormModal
      title="Create new project"
      isOpen={modalState.id === "project"}
      closeModal={() =>
        setModalState({
          id: "",
        })
      }
      submitForm={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="new-project-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Nom" name="name" rules={[rule]}>
          <Input />
        </Form.Item>
      </Form>
    </FormModal>
  );
}

export default CreateProjectModal;
