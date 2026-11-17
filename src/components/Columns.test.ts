import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Columns.module.css", () => {
  it("never makes a column wider than the space it has", () => {
    const css = readFileSync(join(import.meta.dirname, "Columns.module.css"), "utf8");
    expect(css).toContain("minmax(min(var(--columns-min, 260px), 100%), 1fr)");
  });
});
