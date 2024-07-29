import { ColorFormSchema } from "@/src/components/modal/createColor/ColorFormSchema";
import { Prompt } from "@/src/lib/promptBuilder";
import { ProjectType } from "@/src/types/project";
import { ThemeWithColorsType } from "@/src/types/theme";
import { z } from "zod";
import { format } from "./format";

interface propsType {
  project: ProjectType;
  values: z.infer<typeof ColorFormSchema>;
  more?: string;
  lang: string;
  themes: ThemeWithColorsType[];
}

export function buildPrompt(props: propsType) {
  const { project, values, more, lang, themes } = props;

  const prompt = new Prompt()
    .addText(`Task 1: Understand the color`)
    .addText(
      `Provide (in the "${lang}" language) a brief, accurate description of what the color should look like, considering the following context.`
    )
    .addNewline()
    .addText(`Task 2: Name suggestions`)
    .addText(
      `Based on the color description and the following context, provide 3 color suggestions (in rgb) with explanations of why you chose them.`
    )
    .addNewline()
    .addText(`Context:`)
    .addElementList(`Project: "${project.name}"`, 0);

  if (project.description)
    prompt.addElementList(
      `Project description: "${project.description.replace("\n", "\\n")}"`,
      0
    );

  if (values.name)
    prompt.addElementList(`Color name given by the user: "${values.name}"`, 0);

  if (values.description)
    prompt.addElementList(
      `Color description given by the user: "${values.description}"`,
      0
    );

  prompt.addElementList("Existing themes:", 0);

  if (themes.length === 0) {
    prompt.addElementList("No themes", 1);
  } else {
    for (const theme of themes) {
      prompt.addElementList(`"${theme.name}" (${theme.type}):`, 1);
      if (theme.colors.length === 0) {
        prompt.addElementList("No colors", 2);
      } else {
        for (const color of theme.colors) {
          prompt.addElementList(
            `${color.color} (${color.themeColumn.name}) ${color.name ? `named "${color.name}"` : ""}${color.description ? ` described as "${color.description}"` : ""}`,
            2
          );
        }
      }
    }
  }

  prompt.addNewline();

  prompt
    .addText(`Instructions for suggestions:`)
    .addStep(
      `General: "${project.generalPrompt ? project.generalPrompt : "No general instructions"}"`
    )
    .addStep(
      `Specific: "${project.colorPrompt ? project.colorPrompt : "No specific instructions"}"`
    )
    .addStep(
      "Avoid suggesting colors where any of the RGB components are exactly 0 or 255"
    )
    .addStep(
      "Colors should align with the project style and theme implied by existing color names and descriptions"
    )
    .addStep("Colors must reflect the specific shade described in Task 1")
    .addStep(
      `Explanations should be in the following language: "${lang}" and should not exceed 200 characters`
    );

  if (values.name)
    prompt.addStep(
      `Colors MUST REFLECT the color name given by the user: "${values.name}"`
    );
  if (values.description)
    prompt.addStep(
      `Colors MUST REFLECT the color description given by the user: "${values.description}"`
    );
  if (more) prompt.addStep(more);

  prompt.addNewline();

  prompt
    .addText(
      "Respond WITHOUT MARKDOWN, WITHOUT TITLE, in the following STRICT format by replacing the bracket content:"
    )
    .addMultiText(format);

  return prompt.getPrompt();
}
