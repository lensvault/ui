import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { placeBelow, Popover } from "./Popover.js";

describe("Popover", () => {
  it("opens and closes from its button", async () => {
    render(<Popover label="Details">Panel text</Popover>);
    const button = screen.getByRole("button", { name: "Details" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveTextContent("Panel text");
    await userEvent.click(button);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<Popover label="Details">Panel text</Popover>);
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on a click outside, but not inside", async () => {
    render(
      <>
        <Popover label="Details">Panel text</Popover>
        <p>Elsewhere</p>
      </>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    await userEvent.click(screen.getByText("Panel text"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Elsewhere"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("placeBelow", () => {
  it("puts the panel just under its button", () => {
    expect(placeBelow({ bottom: 100, left: 40 }, 1200)).toEqual({
      top: 106,
      left: 40,
      maxWidth: 380,
    });
  });

  it("keeps the panel inside the window's right edge", () => {
    expect(placeBelow({ bottom: 100, left: 1000 }, 1200).left).toBe(1200 - 16 - 380);
  });

  it("narrows the panel on a phone and keeps the left margin", () => {
    expect(placeBelow({ bottom: 100, left: 4 }, 360)).toEqual({
      top: 106,
      left: 16,
      maxWidth: 328,
    });
  });
});
