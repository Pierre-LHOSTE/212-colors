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
      prompt.addElementList(
        `${color.color} named "${color.name}" described as "${color.description}"`,
        2
      );

    if (secondaryColors.length > 0) prompt.addElementList("Secondary:", 1);
    for (const color of secondaryColors)
      prompt.addElementList(
        `${color.color} named "${color.name} described as "${color.description}"`,
        2
      );

    if (specialColors.length > 0) prompt.addElementList("Special:", 1);

    for (const color of specialColors)
      prompt.addElementList(
        `${color.color} named "${color.name}" described as "${color.description}"`,
        2
      );
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
