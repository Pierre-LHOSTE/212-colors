"use client";
import { createThemeColor, updateColor } from "@/src/api/color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ThemeColorType } from "@/src/types/color";
import { ColorPicker, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import AiFormItem from "../../aiFormItem/AiFormItem";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ThemeColorFormSchema";

const rule = createSchemaFieldRule(ColorFormSchema);

export default function CreateThemeColorModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const [isPending, startTransition] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const [previewColor, setPreviewColor] = useState("#000000");
  const project = useDataStore((state) => state.project);

  const { LL } = useI18nContext();

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
  }, [modalState, form]);

  function onSubmit(values: ThemeColorType) {
    if (modalState.mode === "add") {
      const newColor = {
        ...values,
        themeId: modalState.data?.themeId as string,
        themeColumnId: modalState.data?.themeColumnId as string,
      };
      const formValues = {
        color: newColor,
        projectId: project.id,
      };
      startTransition(async () => {
        const res = await createThemeColor(formValues);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description, color, themeColumnId, themeId } =
              res;
            modalState.updateStateCallBack({
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
            content: "Theme color created",
          });
          form.resetFields();
        } else {
          handleError(res, "Failed to create theme color");
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateColor({ color: values, isThemeColor: true });
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description, color } = res;
            modalState.updateStateCallBack({
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
          handleError(res, "Failed to update color");
        }
      });
    }
  }

  function updateCurrentColor(e: { toHexString: () => string }) {
    const hex = e.toHexString();
    form.setFieldsValue({ color: hex });
    setPreviewColor(hex);
  }

  return (
    <FormModal
      title={
        modalState.mode === "add"
          ? LL.project.theme.modal.color.create.title()
          : LL.project.theme.modal.color.edit.title()
      }
      isOpen={modalState.id === "theme-color"}
      mode={modalState.mode}
      closeModal={() =>
        setModalState({
          id: "",
          editItem: null,
        })
      }
      submitForm={() => form.submit()}
      loading={isPending}
    >
      <Form
        layout="vertical"
        name="new-theme-color-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <AiFormItem
          label={LL.project.theme.modal.color.display.name()}
          name="name"
          category="theme"
          rule={rule}
          form={form}
        >
          <Input />
        </AiFormItem>
        <AiFormItem
          label={LL.project.theme.modal.color.display.color()}
          name="color"
          category="theme"
          rule={rule}
          form={form}
        >
          <ColorPicker
            showText
            onChange={updateCurrentColor}
            value={previewColor}
            defaultValue={"#000"}
          />
        </AiFormItem>
        <AiFormItem
          label={LL.project.theme.modal.color.display.description()}
          name="description"
          category="theme"
          rule={rule}
          form={form}
        >
          <Input.TextArea />
        </AiFormItem>
      </Form>
    </FormModal>
  );
}
