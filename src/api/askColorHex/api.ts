"use server";
import { ColorFormSchema } from "@/src/components/modal/createColor/ColorFormSchema";
import { handleServerError } from "@/src/lib/utils";
import { ProjectType } from "@/src/types/project";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { getColors } from "../color";
import { buildPrompt } from "./prompt";

interface propsType {
  project: ProjectType;
  values: z.infer<typeof ColorFormSchema>;
  more?: string;
  lang: string;
}

export async function askColorHex(props: propsType) {
  try {
    const { project, values, lang } = props;
    const colors = await getColors(project.id);
    if ("error" in colors) throw colors;

    const prompt = buildPrompt({
      ...props,
      colors,
      lang,
      values,
    });
    console.log("🚀 ~ prompt:", prompt);

    const result = await generateText({
      model: openai("gpt-4o"),
      temperature: 0.7,
      prompt: prompt,
    });

    return { success: true, response: result.text };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
