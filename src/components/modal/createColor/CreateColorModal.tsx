"use client";
import { createColor, updateColor } from "@/src/api/color";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import { ColorType } from "@/src/types/color";
import { ColorPicker, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ColorFormSchema";

const rule = createSchemaFieldRule(ColorFormSchema);

function CreateColorModal({ params }: { params: { id: string } }) {
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

  function onSubmit(values: ColorType) {
    if (modalState.mode === "add") {
      const newColor = {
        ...values,
        type: modalState.data?.colorType as ColorType["type"],
      };
      const formValues = {
        color: newColor,
        projectId: params.id,
      };
      startTransition(async () => {
        const res = await createColor(formValues);
        if ("id" in res) {
          if (modalState.updateLocalState) {
            const { id, name, description, color, type, position } = res;
            modalState.updateLocalState({
              id,
              name,
              description,
              color,
              type: type as ColorType["type"],
              position,
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
        const res = await updateColor({ color: values });
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

  function updateCurrentColor(e: any) {
    const hex = e.toHexString();
    form.setFieldsValue({ color: hex });
    setPreviewColor(hex);
  }

  return (
    <FormModal
      title="Create new color"
      isOpen={modalState.id === "color"}
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
        name="new-color-form"
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
            onChange={updateCurrentColor}
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

export default CreateColorModal;
