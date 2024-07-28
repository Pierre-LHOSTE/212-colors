export const colorDescriptionPrompt = `Task: Make a description of the color "{color-hex}"
Based on the following context, provide 3 description suggestions for the color.

Context:
- Project: "{project-name}"
- Project description: "{project-description}"{color-name}
- Existing colors:
{colors}

Instructions for describing:
1. General: "{general-instructions}"
2. Specific (Can override general): "{specific-instructions}"
3. Descriptions should align with the project style and theme implied by existing color descriptions{color-name-instructions}
{ask-more}
Respond WITHOUT MARKDOWN, WITHOUT TITLE, in the following STRICT format:
{description1}
{description2}
{description3}`;
