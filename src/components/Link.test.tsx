import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./Link.js";

describe("Link", () => {
  it("opens another site in a new tab", () => {
    render(<Link href="https://example.com/">Example</Link>);
    const link = screen.getByRole("link", { name: "Example" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("stays in the same tab for a path on this site", () => {
    render(<Link href="/lenses">Lenses</Link>);
    const link = screen.getByRole("link", { name: "Lenses" });
    expect(link).toHaveAttribute("href", "/lenses");
    expect(link).not.toHaveAttribute("target");
  });

  it("lets the caller choose the target", () => {
    render(
      <Link href="https://example.com/" target="_self">
        Example
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute("target", "_self");
  });
});
