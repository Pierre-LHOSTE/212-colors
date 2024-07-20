import { askColorDescription } from "@/src/api/askColorDescription";
import { askColorName } from "@/src/api/askColorName";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import { IconSparkles } from "@tabler/icons-react";
import { Button, FormInstance, Input, Popover, Space, Typography } from "antd";
import { useState, useTransition } from "react";

export default function AiPopover({
  form,
  type,
}: {
  form: FormInstance;
  type: "name" | "description" | "color";
}) {
  const [open, setOpen] = useState(false);
  const project = useDataStore((state) => state.project);
  const [moreDetails, setMoreDetails] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const localLanguage = useSettingsStore((state) => state.localLanguage);

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
        res = await askColorName({
          project,
          values: form.getFieldsValue(),
          more: moreDetails,
          lang: localLanguage,
        });
      } else if (type === "description") {
        res = await askColorDescription({
          project,
          values: form.getFieldsValue(),
          more: moreDetails,
        });
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
            suggestions: d.map((s) => ({ value: s })),
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
          suggestions.suggestions.length === 0 ? (
            <Space
              direction="vertical"
              style={{
                maxWidth: "300px",
              }}
            >
              <Typography.Text>
                - {project.generalPrompt}
                <br />-{" "}
                {type === "name"
                  ? project.namePrompt
                  : type === "description"
                    ? project.descriptionPrompt
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
                  <Typography.Text>{s.value}</Typography.Text>
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
          onClick={() => setOpen(true)}
          type="text"
          icon={<IconSparkles stroke={1.25} />}
        />
      </Popover>
    </>
  );
}
