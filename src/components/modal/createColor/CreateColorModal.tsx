"use client";
import { askColorName } from "@/src/api/ai";
import { createColor, updateColor } from "@/src/api/color";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import { useSettingsStore } from "@/src/store/settings";
import type { ColorType } from "@/src/types/color";
import { IconSparkles } from "@tabler/icons-react";
import {
  Button,
  ColorPicker,
  Form,
  Input,
  Popover,
  Space,
  Typography,
} from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState, useTransition } from "react";
import FormModal from "../FormModal";
import { ColorFormSchema } from "./ColorFormSchema";
import "./suggestion.scss";

const rule = createSchemaFieldRule(ColorFormSchema);

export default function CreateColorModal() {
  const setMessage = useSettingsStore((state) => state.setMessage);
  const [isPending, startTransition] = useTransition();
  const [isPendingAi, startTransitionAi] = useTransition();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalState = useModalStore((state) => state.modalState);
  const [form] = Form.useForm();
  const [previewColor, setPreviewColor] = useState("#000000");
  const project = useDataStore((state) => state.project);
  const { LL } = useI18nContext();
  const [nameSuggestions, setNameSuggestions] = useState({
    nameDescription: "",
    suggestions: [] as {
      name: string;
      explanation: string;
    }[],
  });
  const [open, setOpen] = useState(false);
  const [askMore, setAskMore] = useState<string | undefined>(undefined);
  const localLanguage = useSettingsStore((state) => state.localLanguage);

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
  }, [modalState.editItem, form]);

  useEffect(() => {
    console.log(nameSuggestions);
  }, [nameSuggestions]);

  async function handleAskName() {
    startTransitionAi(async () => {
      const res = await askColorName({
        project,
        values: form.getFieldsValue(),
        more: askMore,
        lang: localLanguage,
      });
      if ("error" in res) {
        return handleError(res, "Failed to create color");
      }
      const d = res.response.split("\n");
      const description = d[0];
      const suggestion1 = { name: d[2], explanation: d[3] };
      const suggestion2 = { name: d[5], explanation: d[6] };
      const suggestion3 = { name: d[8], explanation: d[9] };

      if (description && suggestion1 && suggestion2 && suggestion3) {
        setNameSuggestions({
          nameDescription: description,
          suggestions: [suggestion1, suggestion2, suggestion3],
        });
      } else {
        return handleError({
          error: true,
          message: "Failed to get name suggestions",
        });
      }
    });
  }

  function onSubmit(values: ColorType) {
    if (modalState.mode === "add") {
      const newColor = {
        ...values,
        type: modalState.data?.colorType as ColorType["type"],
      };
      const formValues = {
        color: newColor,
        projectId: project.id,
      };
      startTransition(async () => {
        const res = await createColor(formValues);
        if ("id" in res) {
          if (modalState.updateStateCallBack) {
            const { id, name, description, color, type, position } = res;
            modalState.updateStateCallBack({
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
          handleError(res, "Failed to create color");
        }
      });
    } else {
      values.id = modalState.editItem.id as string;
      startTransition(async () => {
        const res = await updateColor({ color: values });
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

  function handlePopoverChange(newOpen: boolean) {
    if (!newOpen) {
      setNameSuggestions({
        nameDescription: "",
        suggestions: [],
      });
    }
    setOpen(newOpen);
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
          ? LL.project.color.modal.create.title()
          : LL.project.color.modal.edit.title()
      }
      isOpen={modalState.id === "color"}
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
        name="new-color-form"
        disabled={isPending}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label={LL.project.color.modal.display.name()}
          name="name"
          rules={[rule]}
        >
          <Input
            suffix={
              project.owner.premium ? (
                <Popover
                  placement="rightTop"
                  open={open}
                  trigger={"click"}
                  onOpenChange={handlePopoverChange}
                  content={
                    nameSuggestions.suggestions.length === 0 ? (
                      <Space
                        direction="vertical"
                        style={{
                          maxWidth: "300px",
                        }}
                      >
                        <Typography.Text>
                          - {project.generalPrompt}
                          <br />- {project.namePrompt}
                        </Typography.Text>
                        <Input.TextArea
                          placeholder="Say more?"
                          value={askMore ?? ""}
                          onChange={(e) => setAskMore(e.target.value)}
                        />
                        <Button
                          loading={isPendingAi}
                          onClick={handleAskName}
                          type="primary"
                        >
                          Ask
                        </Button>
                      </Space>
                    ) : (
                      <Space direction="vertical">
                        {nameSuggestions.suggestions.map((s, i) => (
                          <div
                            className="suggestion"
                            key={i}
                            onClick={() => {
                              form.setFieldsValue({ name: s.name });
                              handlePopoverChange(false);
                            }}
                          >
                            <Typography.Text>{s.name}</Typography.Text>
                            <Typography.Text type="secondary">
                              {s.explanation}
                            </Typography.Text>
                          </div>
                        ))}
                      </Space>
                    )
                  }
                >
                  <Button
                    onClick={() => setOpen(true)}
                    type="text"
                    icon={<IconSparkles stroke={1.25} />}
                  />
                </Popover>
              ) : null
            }
          />
        </Form.Item>
        <Form.Item
          label={LL.project.color.modal.display.color()}
          name="color"
          rules={[rule]}
        >
          <ColorPicker
            showText
            onChange={updateCurrentColor}
            value={previewColor}
            defaultValue={"#000"}
          />
        </Form.Item>
        <Form.Item
          label={LL.project.color.modal.display.description()}
          name="description"
          rules={[rule]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </FormModal>
  );
}
