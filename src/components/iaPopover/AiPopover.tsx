import { askColorName } from "@/src/api/ai";
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
      explanation: string;
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
      const res = await askColorName({
        project,
        values: form.getFieldsValue(),
        more: moreDetails,
        lang: localLanguage,
      });
      if ("error" in res) {
        return handleError(res, "Failed to create color");
      }
      const d = res.response.split("\n");
      const description = d[0];
      const suggestion1 = { value: d[2], explanation: d[3] };
      const suggestion2 = { value: d[5], explanation: d[6] };
      const suggestion3 = { value: d[8], explanation: d[9] };

      if (description && suggestion1 && suggestion2 && suggestion3) {
        setSuggestions({
          description: description,
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
                <br />- {project.namePrompt}
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
                    form.setFieldsValue({ name: s.value });
                    handlePopoverChange(false);
                  }}
                >
                  <Typography.Text>{s.value}</Typography.Text>
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
    </>
  );
}
