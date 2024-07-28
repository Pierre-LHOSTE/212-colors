"use server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { ColorFormSchema } from "../components/modal/createColor/ColorFormSchema";
import { handleServerError } from "../lib/utils";
import { colorHexPrompt } from "../prompts/colorHex";
import { ColorType } from "../types/color";
import { ProjectType } from "../types/project";
import { getColors } from "./color";

function formatColors(type: string, colors: ColorType[]) {
  return colors
    .filter((color) => color.type === type && color.name)
    .map(
      (color) =>
        `    - ${color.color} ${color.name ? `named "${color.name}"` : ""}${color.description ? ` described as "${color.description}"` : ""}`
    )
    .join("\n");
}

export async function askColorHex({
  project,
  values,
  more,
  lang,
}: {
  project: ProjectType;
  values: z.infer<typeof ColorFormSchema>;
  more?: string;
  lang: string;
}) {
  try {
    let step = 6;
    const colors = await getColors(project.id);

    if ("error" in colors) {
      throw colors;
    }

    const formattedColors = [];
    const primaryColors = formatColors("primary", colors);
    const secondaryColors = formatColors("secondary", colors);
    const specialColors = formatColors("special", colors);

    if (primaryColors) {
      formattedColors.push("  - Primary:\n" + primaryColors);
    }
    if (secondaryColors) {
      formattedColors.push("  - Secondary:\n" + secondaryColors);
    }
    if (specialColors) {
      formattedColors.push("  - Special:\n" + specialColors);
    }

    if (formattedColors.length === 0) {
      formattedColors.push("  - No colors");
    }

    let prompt = colorHexPrompt
      .replace(/{lang}/g, lang)
      .replace(/{project-name}/g, project.name)
      .replace(/{colors}/g, formattedColors.join("\n"))
      .replace(
        /{project-description}/g,
        project.description ?? "No description"
      )
      .replace(
        /{general-instructions}/g,
        project.generalPrompt ?? "No general instructions"
      )
      .replace(
        /{specific-instructions}/g,
        project.colorPrompt ?? "No specific instructions"
      );

    if (values.name && values.name.trim() !== "") {
      prompt = prompt
        .replace(
          /{color-name}/g,
          `\n- Color name given by the user: "${values.name}"`
        )
        .replace(
          /{color-name-instructions}/g,
          `\n${step}. The names MUST REFLECT the color name given by the user: "{color-name}"`
        );
      step++;
    } else {
      prompt = prompt
        .replace(/{color-name}/g, "")
        .replace(/{color-name-instructions}/g, "");
    }

    if (values.description && values.description.trim() !== "") {
      prompt = prompt
        .replace(
          /{color-description}/g,
          `\n- Color description given by the user: "${values.description}"`
        )
        .replace(
          /{color-description-instructions}/g,
          `\n${step}. The names MUST REFLECT the color description given by the user: "{color-description}"`
        );
      step++;
    } else {
      prompt = prompt
        .replace(/{color-description}/g, "")
        .replace(/{color-description-instructions}/g, "");
    }

    if (more) {
      prompt = prompt.replace(
        /{ask-more}/g,
        `${step} (Very important!). ${more}`
      );
    } else {
      prompt = prompt.replace(/{ask-more}/g, "");
    }

    console.log("---------------");
    console.log(prompt);

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
