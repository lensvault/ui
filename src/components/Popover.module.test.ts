import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Popover.module.css", () => {
  const css = readFileSync(join(import.meta.dirname, "Popover.module.css"), "utf8");
  const button = /\.button \{([^}]*)\}/.exec(css)?.[1] ?? "";

  it("inherits the whole font so the button keeps the text's line height", () => {
    expect(button).toMatch(/font: inherit;/);
  });

  it("keeps the 14px size after inheriting the font", () => {
    expect(button.indexOf("font-size: 14px;")).toBeGreaterThan(button.indexOf("font: inherit;"));
  });

  it("keeps a link's bold weight after inheriting the font", () => {
    expect(button.indexOf("font-weight: 700;")).toBeGreaterThan(button.indexOf("font: inherit;"));
  });
});
