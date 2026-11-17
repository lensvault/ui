import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cssVariableName, tokenNames } from "../theme/theme.js";

const folder = import.meta.dirname;
const files = readdirSync(folder);
const read = (file: string) => readFileSync(join(folder, file), "utf8");
const cssFiles = files.filter((file) => file.endsWith(".module.css"));
const componentFiles = files.filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"));

const componentVariables = new Set(["--columns-min"]);
const tokenVariables = new Set(tokenNames.map(cssVariableName));

describe.each(cssFiles)("%s", (file) => {
  it("uses only theme tokens and the component's own variables", () => {
    const used = [...read(file).matchAll(/var\((--[\w-]+)/g)].map(([, name]) => name ?? "");
    const unknown = used.filter(
      (name) => !tokenVariables.has(name) && !componentVariables.has(name),
    );
    expect(unknown).toEqual([]);
  });
});

describe.each(componentFiles)("%s", (file) => {
  it("uses only classes its CSS modules define", () => {
    const source = read(file);
    const missing: string[] = [];
    for (const [, binding, cssFile] of source.matchAll(
      /import (\w+) from "\.\/([\w.-]+\.module\.css)"/g,
    )) {
      const defined = new Set(
        [...read(cssFile ?? "").matchAll(/\.([a-zA-Z][\w]*)/g)].map(([, name]) => name),
      );
      for (const [, name] of source.matchAll(new RegExp(`\\b${binding ?? ""}\\.(\\w+)`, "g"))) {
        if (!defined.has(name)) missing.push(`${cssFile ?? ""}: .${name ?? ""}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
