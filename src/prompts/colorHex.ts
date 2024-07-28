export const colorHexPrompt = `Task 1: Understand the color
Provide (in the "{lang}" language) a brief, accurate description of what the color should look like, considering the following context.

Task 2: Name suggestions
Based on the color description and the following context, provide 3 color suggestions (in rgb) with explanations of why you chose them.

Context:
- Project: "{project-name}"
- Project description: "{project-description}"{color-description}
- Existing colors:
{colors}

Instructions for suggestions:
1. General: "{general-instructions}"
2. Specific (Can override general): "{specific-instructions}"
3. Colors should align with the project style and theme implied by existing color names and descriptions
4. Colors must reflect the specific shade described in Task 1
5. Explanations should be in the following language: "{lang}" and should not exceed 200 characters{color-name-instructions}{color-description-instructions}
{ask-more}
Respond WITHOUT MARKDOWN, WITHOUT TITLE, in the following STRICT format:
{brief, accurate description of the color}

{rgb1}
{explanation-why1}

{rgb2}
{explanation-why2}

{rgb3}
{explanation-why3}`;
