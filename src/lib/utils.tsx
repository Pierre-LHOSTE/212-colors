import { colord } from "colord";

export function isVeryLightColor(color: string): boolean {
  const c = colord(color);

  if (c.luminance() >= 0.5) {
    return true;
  }

  return false;
}
