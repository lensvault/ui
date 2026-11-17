import { describe, expect, it } from "vitest";
import { testTheme } from "./test-theme.js";
import { cssVariableName, defineTheme, mapTokens, tokenNames } from "./theme.js";
import { themeCss } from "./theme-css.js";
import { varNames, vars } from "./vars.js";

describe("cssVariableName", () => {
  it("turns camelCase token names into prefixed kebab-case variables", () => {
    expect(cssVariableName("bg")).toBe("--lv-bg");
    expect(cssVariableName("accentInk")).toBe("--lv-accent-ink");
    expect(cssVariableName("fontMonoDisplay")).toBe("--lv-font-mono-display");
  });

  it("gives every token a different variable", () => {
    expect(new Set(tokenNames.map(cssVariableName)).size).toBe(tokenNames.length);
  });
});

describe("defineTheme", () => {
  it("rejects a theme missing a token at compile time", () => {
    const withoutAccent = Object.fromEntries(
      Object.entries(testTheme.dark).filter(([name]) => name !== "accent"),
    );
    expect(() =>
      // @ts-expect-error: dark has no accent, which the Theme type requires
      defineTheme({ light: testTheme.light, dark: withoutAccent }),
    ).not.toThrow();
  });
});

describe("mapTokens", () => {
  it("gives a value for every token", () => {
    expect(Object.keys(mapTokens((name) => name))).toEqual([...tokenNames]);
  });
});

describe("vars", () => {
  it("references each token's variable", () => {
    expect(vars.accent).toBe("var(--lv-accent)");
    expect(vars.gapXs).toBe("var(--lv-gap-xs)");
    expect(varNames.accentInk).toBe("--lv-accent-ink");
  });
});

describe("themeCss", () => {
  const css = themeCss(testTheme);

  it("defaults to light, and to dark when the system prefers it", () => {
    expect(css).toContain(
      ':root,\n[data-theme="light"] {\n  color-scheme: light;\n  --lv-bg: #f7f7f5;',
    );
    expect(css).toContain(
      '@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n    color-scheme: dark;\n    --lv-bg: #13161a;',
    );
  });

  it("lets data-theme force dark", () => {
    expect(css).toContain('[data-theme="dark"] {\n  color-scheme: dark;\n  --lv-bg: #13161a;');
  });

  it("writes every token in each of the three blocks", () => {
    for (const name of tokenNames) {
      expect(css.split(`${cssVariableName(name)}:`)).toHaveLength(4);
    }
  });

  it("refuses a value that would break out of the style block", () => {
    const broken = defineTheme({
      light: testTheme.light,
      dark: { ...testTheme.dark, bg: "red; } body { display: none" },
    });
    expect(() => themeCss(broken)).toThrow('Theme token "bg" (dark)');
  });

  it.each(["red /* x", "red */", "\\7d red", "url(a\\)"])("refuses %s", (value) => {
    const broken = defineTheme({
      light: { ...testTheme.light, line: value },
      dark: testTheme.dark,
    });
    expect(() => themeCss(broken)).toThrow('Theme token "line" (light)');
  });

  it("refuses an empty value", () => {
    const empty = defineTheme({ light: { ...testTheme.light, ink: " " }, dark: testTheme.dark });
    expect(() => themeCss(empty)).toThrow('Theme token "ink" (light)');
  });

  it("applies the right values in a browser", () => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    document.documentElement.dataset.theme = "dark";
    expect(getComputedStyle(document.documentElement).getPropertyValue(varNames.bg).trim()).toBe(
      "#13161a",
    );
    document.documentElement.dataset.theme = "light";
    expect(getComputedStyle(document.documentElement).getPropertyValue(varNames.bg).trim()).toBe(
      "#f7f7f5",
    );
    style.remove();
    delete document.documentElement.dataset.theme;
  });
});
