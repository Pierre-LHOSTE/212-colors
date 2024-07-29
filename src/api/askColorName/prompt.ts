import { ColorFormSchema } from "@/src/components/modal/createColor/ColorFormSchema";
import { Prompt } from "@/src/lib/promptBuilder";
import { ColorType } from "@/src/types/color";
import { ProjectType } from "@/src/types/project";
import { z } from "zod";
import { format } from "./format";

interface propsType {
  project: ProjectType;
  values: z.infer<typeof ColorFormSchema>;
  more?: string;
  lang: string;
  colors: ColorType[];
}

export function buildPrompt(props: propsType) {
  const { project, values, more, lang, colors } = props;
  const { color } = values;

  const prompt = new Prompt()
    .addText(`Task 1: Describe the color "${color}"`)
    .addText(
      `Provide (in the "${lang}" language) a brief, accurate description of the color represented by the hex code "${color}". Focus on its shade, intensity, and any notable characteristics`
    )
    .addNewline()
    .addText(`Task 2: Name suggestions for "${color}"`)
    .addText(
      `Based on the color description and the following context, provide 3 name suggestions with explanations of why you chose them.`
    )
    .addNewline()
    .addText(`Context:`)
    .addElementList(`Project: "${project.name}"`, 0);

  if (project.description)
    prompt.addElementList(
      `Project description: "${project.description.replace("\n", "\\n")}"`,
      0
    );

  if (values.description)
    prompt.addElementList(
      `Color description given by the user: "${values.description}"`,
      0
    );

  prompt.addElementList("Existing colors:", 0);

  if (colors.length === 0) {
    prompt.addElementList("No colors", 1);
  } else {
    const primaryColors = colors.filter((color) => color.type === "primary");
    const secondaryColors = colors.filter(
      (color) => color.type === "secondary"
    );
    const specialColors = colors.filter((color) => color.type === "special");

    if (primaryColors.length > 0) prompt.addElementList("Primary:", 1);
    for (const color of primaryColors)
      prompt.addElementList(`${color.color} named "${color.name}"`, 2);

    if (secondaryColors.length > 0) prompt.addElementList("Secondary:", 1);
    for (const color of secondaryColors)
      prompt.addElementList(`${color.color} named "${color.name}"`, 2);

    if (specialColors.length > 0) prompt.addElementList("Special:", 1);

    for (const color of specialColors)
      prompt.addElementList(`${color.color} named "${color.name}"`, 2);
  }

  prompt.addNewline();

  prompt
    .addText(`Instructions for naming:`)
    .addStep(
      `General: "${project.generalPrompt ? project.generalPrompt : "No general instructions"}"`
    )
    .addStep(
      `Specific: "${project.colorPrompt ? project.colorPrompt : "No specific instructions"}"`
    )
    .addStep(
      "Names should align with the project style and theme implied by existing color names"
    )
    .addStep("Names must reflect the specific shade described in Task 1")
    .addStep(
      `Explanations should be in the following language: "${lang}" and should not exceed 200 characters`
    );

  if (values.description)
    prompt.addStep(
      `Names MUST REFLECT the color description given by the user: "${values.description}"`
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
