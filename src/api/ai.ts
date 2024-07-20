"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { ColorFormSchema } from "../components/modal/createColor/ColorFormSchema";
import { handleServerError } from "../lib/utils";
import { colorNamePrompt } from "../prompts/colorName";
import { ColorType } from "../types/color";
import { ProjectType } from "../types/project";
import { getColors } from "./color";

function formatColors(type: string, colors: ColorType[]) {
  return colors
    .filter((color) => color.type === type)
    .map(
      (color) =>
        `    - ${color.color} named "${color.name}" and described as "${color.description}"`
    )
    .join("\n");
}

export async function askColorName({
  project,
  values,
}: {
  project: ProjectType;
  values: z.infer<typeof ColorFormSchema>;
}) {
  try {
    const colors = await getColors(project.id);

    if ("error" in colors) {
      throw colors;
    }

    const formattedColors = [
      "  - Primary:\n" + formatColors("primary", colors),
      "  - Secondary:\n" + formatColors("secondary", colors),
      "  - Special:\n" + formatColors("special", colors),
    ].join("\n");

    const prompt = colorNamePrompt
      .replace("{color-hex}", values.color)
      .replace("{project-name}", project.name)
      .replace("{colors}", formattedColors);

    if (project.description)
      prompt.replace("{project-description}", project.description);

    if (project.generalPrompt)
      prompt.replace("{general-instructions}", project.generalPrompt);

    if (project.namePrompt)
      prompt.replace("{specific-instructions}", project.namePrompt);

    const result = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    });
    console.log(result.text);

    return { success: true, response: result.text };
  } catch (error: unknown) {
    return handleServerError(error);
  }
}
