import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
extend([a11yPlugin]);

export function isVeryLightColor(color: string): boolean {
  const c = colord(color);

  if (c.luminance() >= 0.5) {
    return true;
  }

  return false;
}
