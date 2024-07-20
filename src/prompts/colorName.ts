export const colorNamePrompt = `Task 1: Describe the color "{color-hex}"
Provide (in the "{lang}" language) a brief, accurate description of the color represented by the hex code "{color-hex}". Focus on its shade, intensity, and any notable characteristics.

Task 2: Name suggestions for "{color-hex}"
Based on the color description and the following context, provide 3 name suggestions with explanations of why you chose them.

Context:
- Project: "{project-name}"
- Description: "{project-description}"
- Existing colors:
{colors}

Instructions for naming:
1. General: "{general-instructions}"
2. Specific (Can override general): "{specific-instructions}"
3. The name should align with the project style and theme implied by existing color names
4. The name must reflect the specific shade described in Task 1
5. The explanation should be in the following language: "{lang}" and should not exceed 200 characters
{ask-more}
Respond WITHOUT MARKDOWN, WItHOUT TITLE, in the following STRICT format:
{brief, accurate description of the color}

{name1}
{explanation-why1}

{name2}
{explanation-why2}

{name3}
{explanation-why3}`;
