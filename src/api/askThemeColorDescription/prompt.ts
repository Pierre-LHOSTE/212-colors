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
  themes: ThemeWithColorsType[];
}

export function buildPrompt(props: propsType) {
  const { project, values, more, themes } = props;
  const { color } = values;

  const prompt = new Prompt();

  prompt
    .addText(`Task: Make a description of the color "${color}"`)
    .addText(
      "Based on the following context, provide 3 description suggestions for the color."
    )
    .addNewline();

  prompt.addText(`Context:`).addElementList(`Project: "${project.name}"`, 0);

  if (project.description)
    prompt.addElementList(
      `Project description: "${project.description.replace("\n", "\\n")}"`,
      0
    );

  if (values.name)
    prompt.addElementList(`Color name given by the user: "${values.name}"`, 0);

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
    .addText(`Instructions for descriptions:`)
    .addStep(
      `General: "${project.generalPrompt ? project.generalPrompt : "No general instructions"}"`
    )
    .addStep(
      `Specific: "${project.colorPrompt ? project.colorPrompt : "No specific instructions"}"`
    )
    .addStep(
      `Descriptions should align with the project style and theme implied by existing color descriptions`
    );

  if (values.name)
    prompt.addStep(
      `Description should align with the color name (given by the user) without mentioning it`
    );
  if (more) prompt.addStep(more);

  prompt.addNewline();

  prompt
    .addText(
      "Respond WITHOUT MARKDOWN, WITHOUT TITLE, in the following STRICT format:"
    )
    .addMultiText(format);

  return prompt.getPrompt();
}
