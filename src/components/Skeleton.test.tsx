import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton.js";

describe("Skeleton", () => {
  it("is hidden from assistive technology, which hears the page's busy state instead", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("fills its width by default and takes a narrower width or a fixed height", () => {
    const { container } = render(
      <>
        <Skeleton />
        <Skeleton widthPercent={60} heightPx={120} />
      </>,
    );
    const [line, block] = Array.from(container.children);
    expect(line).toHaveStyle({ width: "100%" });
    expect(line).not.toHaveAttribute("style", expect.stringContaining("height"));
    expect(block).toHaveStyle({ width: "60%", height: "120px" });
  });
});

describe("Skeleton.module.css", () => {
  const css = readFileSync(join(import.meta.dirname, "Skeleton.module.css"), "utf8");

  it("is one line of the surrounding text tall unless given a height", () => {
    expect(/\.skeleton \{([^}]*)\}/.exec(css)?.[1]).toMatch(/height: 1lh;/);
  });

  it("stops shimmering when the visitor asks for reduced motion", () => {
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.skeleton \{\s*animation: none;/,
    );
  });
});
