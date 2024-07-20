export const colorDescriptionPrompt = `Task: Make a description of the color "{color-hex}"
Based on the following context, provide 3 description suggestions for the color.

Context:
- Project: "{project-name}"
- Description: "{project-description}"
- Existing colors:
{colors}

Instructions for describing:
1. General: "{general-instructions}"
2. Specific (Can override general): "{specific-instructions}"
3. The description should align with the project style and theme implied by existing color descriptions
{ask-more}
Respond WITHOUT MARKDOWN, WItHOUT TITLE, in the following STRICT format:
{description1}
{description2}
{description3}`;
