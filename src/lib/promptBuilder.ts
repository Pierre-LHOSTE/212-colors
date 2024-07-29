export class Prompt {
  step: number;
  prompt: string[];

  constructor() {
    this.step = 0;
    this.prompt = [];
  }

  addStep(text: string) {
    this.step++;
    this.prompt.push(`${this.step.toString()}. ${text.replace("\n", "")}`);
    return this;
  }

  addText(text: string) {
    this.prompt.push(text.replace("\n", ""));
    return this;
  }

  addMultiText(text: string) {
    this.prompt.push(text);
    return this;
  }

  addNewline() {
    this.prompt.push("");
    return this;
  }

  addElementList(text: string, level: number) {
    let element = Array(level).fill("  ").join("");
    this.prompt.push(`${element}- ${text.replace("\n", "")}`);
    return this;
  }

  getPrompt(): string {
    return this.prompt.join("\n");
  }
}
