import { askColorDescription } from "@/src/api/askColorDescription/api";
import { askColorHex } from "@/src/api/askColorHex/api";
import { askColorName } from "@/src/api/askColorName/api";
import { askThemeColorDescription } from "@/src/api/askThemeColorDescription/api";
import { askThemeColorHex } from "@/src/api/askThemeColorHex/api";
import { askThemeColorName } from "@/src/api/askThemeColorName/api";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import { LoadingOutlined } from "@ant-design/icons";
import { IconSparkles } from "@tabler/icons-react";
import {
  Button,
  ColorPicker,
  FormInstance,
  Input,
  Popover,
  Space,
  Spin,
  Typography,
} from "antd";
import { colord } from "colord";
import { useState, useTransition } from "react";

export default function AiPopover({
  form,
  type,
  category,
}: {
  form: FormInstance;
  type: "name" | "description" | "color";
  category: "color" | "theme";
}) {
  const [open, setOpen] = useState(false);
  const project = useDataStore((state) => state.project);
  const [moreDetails, setMoreDetails] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const localLanguage = useSettingsStore((state) => state.localLanguage);
  const { LL } = useI18nContext();

  const [suggestions, setSuggestions] = useState({
    description: "",
    suggestions: [] as {
      value: string;
      explanation?: string;
    }[],
  });

  function handlePopoverChange(newOpen: boolean) {
    if (!newOpen) {
      setSuggestions({
        description: "",
        suggestions: [],
      });
    }
    setOpen(newOpen);
  }

  async function askSuggestions() {
    startTransition(async () => {
      let res;
      if (type === "name") {
        if (category === "color") {
          res = await askColorName({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
            lang: localLanguage,
          });
        } else {
          res = await askThemeColorName({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
            lang: localLanguage,
          });
        }
      } else if (type === "description") {
        if (category === "color") {
          res = await askColorDescription({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
          });
        } else {
          res = await askThemeColorDescription({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
          });
        }
      } else if (type === "color") {
        if (category === "color") {
          res = await askColorHex({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
            lang: localLanguage,
          });
        } else {
          res = await askThemeColorHex({
            project,
            values: form.getFieldsValue(),
            more: moreDetails,
            lang: localLanguage,
          });
        }
      }

      if (!res) {
        return handleError({
          error: true,
          message: `Type ${type} is not supported`,
        });
      }

      if ("error" in res) {
        return handleError(res, `Failed to create ${type}`);
      }

      console.log(res.response);

      const d = res.response.split("\n");

      if (type === "name") {
        const description = d[0];
        const suggestionsArray = [];

        for (let i = 2; i < d.length; i += 3) {
          suggestionsArray.push({
            value: d[i],
            explanation: d[i + 1],
          });
        }

        if (description && suggestionsArray.length) {
          setSuggestions({
            description: description,
            suggestions: suggestionsArray,
          });
        } else {
          return handleError({
            error: true,
            message: `Failed to get ${type} suggestions`,
          });
        }
      } else if (type === "description") {
        if (d.length) {
          setSuggestions({
            description: "",
            suggestions: d.filter((s) => s).map((s) => ({ value: s })),
          });
        } else {
          return handleError({
            error: true,
            message: `Failed to get ${type} suggestions`,
          });
        }
      } else if (type === "color") {
        const description = d[0];
        const suggestionsArray = [];

        for (let i = 2; i < d.length; i += 3) {
          const color = colord(d[i]).toHex();
          suggestionsArray.push({
            value: color,
            explanation: d[i + 1],
          });
        }

        if (description && suggestionsArray.length) {
          setSuggestions({
            description: description,
            suggestions: suggestionsArray,
          });
        } else {
          return handleError({
            error: true,
            message: `Failed to get ${type} suggestions`,
          });
        }
      }
    });
  }

  return (
    <>
      <Popover
        placement="rightTop"
        open={open}
        trigger={"click"}
        onOpenChange={handlePopoverChange}
        content={
          isPending ? (
            <>
              <Spin indicator={<LoadingOutlined spin />} />
            </>
          ) : suggestions.suggestions.length === 0 ? (
            <Space
              direction="vertical"
              style={{
                maxWidth: "300px",
              }}
            >
              <Typography.Text>
                -{" "}
                {project.generalPrompt
                  ? project.generalPrompt
                  : LL.project.info.prompt.noGeneralPrompt()}
                <br />-{" "}
                {type === "name"
                  ? project.namePrompt
                    ? project.namePrompt
                    : LL.project.info.prompt.noNamePrompt()
                  : type === "description"
                    ? project.descriptionPrompt
                      ? project.descriptionPrompt
                      : LL.project.info.prompt.noDescriptionPrompt()
                    : type === "color"
                      ? project.colorPrompt
                        ? project.colorPrompt
                        : LL.project.info.prompt.noColorPrompt()
                      : ""}
              </Typography.Text>
              <Input.TextArea
                placeholder="Say more?"
                value={moreDetails ?? ""}
                onChange={(e) => setMoreDetails(e.target.value)}
              />
              <Button
                loading={isPending}
                onClick={askSuggestions}
                type="primary"
              >
                Ask
              </Button>
            </Space>
          ) : (
            <Space direction="vertical">
              {suggestions.suggestions.map((s, i) => (
                <div
                  className="suggestion"
                  key={i}
                  onClick={() => {
                    form.setFieldValue(type, s.value);
                    handlePopoverChange(false);
                  }}
                >
                  {type === "color" ? (
                    <ColorPicker
                      showText
                      value={s.value}
                      onOpenChange={() => {}}
                      open={false}
                      format="hex"
                    />
                  ) : (
                    <Typography.Text>{s.value}</Typography.Text>
                  )}
                  {s.explanation && (
                    <Typography.Text type="secondary">
                      {s.explanation}
                    </Typography.Text>
                  )}
                </div>
              ))}
            </Space>
          )
        }
      >
        <Button
          onClick={(e) => {
            if (e.shiftKey) {
              setOpen(true);
            } else {
              askSuggestions();
            }
          }}
          type="text"
          icon={<IconSparkles stroke={1.25} />}
        />
      </Popover>
    </>
  );
}
