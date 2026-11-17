import { cssVariableName, tokenNames, type Theme, type TokenName, type Tokens } from "./theme.js";

const unsafeInCss = /[;{}<>\\]|\/\*|\*\//;

function declarations(tokens: Tokens, scheme: "light" | "dark", indent: string): string {
  const lines = tokenNames.map((name: TokenName) => {
    const value = tokens[name];
    if (value.trim() === "" || unsafeInCss.test(value)) {
      throw new Error(`Theme token "${name}" (${scheme}) has a value CSS can't hold: "${value}"`);
    }
    return `${indent}${cssVariableName(name)}: ${value};`;
  });
  return [`${indent}color-scheme: ${scheme};`, ...lines].join("\n");
}

export function themeCss(theme: Theme): string {
  return [
    `:root,\n[data-theme="light"] {\n${declarations(theme.light, "light", "  ")}\n}`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${declarations(theme.dark, "dark", "    ")}\n  }\n}`,
    `[data-theme="dark"] {\n${declarations(theme.dark, "dark", "  ")}\n}`,
  ].join("\n\n");
}
