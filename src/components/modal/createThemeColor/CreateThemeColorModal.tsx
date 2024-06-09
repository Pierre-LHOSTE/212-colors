"use client";
import { createThemeColor, updateColor } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ThemeColorType } from "@/src/types/color";
import { ColorPicker, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ThemeColorFormSchema";

const rule = createSchemaFieldRule(ColorFormSchema);

function CreateThemeColorModal({ params }: { params: { id: string } }) {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const setNotification = useSettingsStore((state) => state.setNotification);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const [previewColor, setPreviewColor] = useState("#000000");

  useEffect(() => {
    const editItem = modalState?.editItem;

    if (editItem) {
      if (editItem.name) form.setFieldValue("name", editItem.name);
      if (editItem.color) {
        form.setFieldValue("color", editItem.color);
        setPreviewColor(editItem.color);
      }
      if (editItem.description)
        form.setFieldValue("description", editItem.description);
    } else {
      form.resetFields();
      setPreviewColor("#000000");
    }
  }, [modalState.editItem?.id, form]);

  function onSubmit(values: ThemeColorType) {
    if (modalState.mode === "add") {
      const newColor = {
        ...values,
        themeId: modalState.data?.themeId as string,
        themeColumnId: modalState.data?.themeColumnId as string,
      };
      const formValues = {
        color: newColor,
        projectId: params.id,
      };
      startTransition(async () => {
        const res = await createThemeColor(formValues);
        if ("id" in res) {
          if (modalState.updateLocalState) {
            const { id, name, description, color, themeColumnId, themeId } =
              res;
            modalState.updateLocalState({
              id,
              name,
              description,
              color,
              themeColumnId,
              themeId,
            });
          }
          setModalState({
            id: "",
          });
          setMessage({
            type: "success",
            content: "Color created",
          });
          form.resetFields();
        } else {
          setMessage({
            type: "error",
            content: "Failed to create color",
          });
          setNotification({
            type: "error",
            message: "Error",
            description: <>{res.message || "An error occurred"}</>,
          });
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateColor({ color: values, isThemeColor: true });
        console.log("🚀 ~ res:", res);
        if ("id" in res) {
          if (modalState.updateLocalState) {
            const { id, name, description, color } = res;
            modalState.updateLocalState({
              id,
              name,
              description,
              color,
            });
          }
          setModalState({
            id: "",
          });
          setMessage({
            type: "success",
            content: "Color updated",
          });
          form.resetFields();
        } else {
          setMessage({
            type: "error",
            content: "Failed to update color",
          });
          setNotification({
            type: "error",
            message: "Error",
            description: <>{res.message || "An error occurred"}</>,
          });
        }
      });
    }
  }

  function updateLocalColor(e: any) {
    const hex = e.toHexString();
    form.setFieldsValue({ color: hex });
    setPreviewColor(hex);
  }

  return (
    <FormModal
      title={"Create new theme color"}
      isOpen={modalState.id === "theme-color"}
      closeModal={() =>
        setModalState({
          id: "",
          editItem: null,
        })
      }
      submitForm={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="new-theme-color-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Nom" name="name" rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item label="Couleur" name="color" rules={[rule]}>
          <ColorPicker
            showText
            onChange={updateLocalColor}
            value={previewColor}
            defaultValue={"#000"}
          />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[rule]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </FormModal>
  );
}

export default CreateThemeColorModal;
