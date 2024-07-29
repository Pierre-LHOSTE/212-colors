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
  colors: ColorType[];
}

export function buildPrompt(props: propsType) {
  const { project, values, more, colors } = props;
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

  if (values.description)
    prompt.addElementList(`Color name given by the user: "${values.name}"`, 0);

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
        `${color.color} described as "${color.description}"`,
        2
      );

    if (secondaryColors.length > 0) prompt.addElementList("Secondary:", 1);
    for (const color of secondaryColors)
      prompt.addElementList(
        `${color.color} described as "${color.description}"`,
        2
      );

    if (specialColors.length > 0) prompt.addElementList("Special:", 1);

    for (const color of specialColors)
      prompt.addElementList(
        `${color.color} described as "${color.description}"`,
        2
      );
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
