import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle.js";

describe("Toggle", () => {
  it("is a labelled switch that reports the new state", async () => {
    const onChange = vi.fn();
    render(
      <Toggle checked={false} onChange={onChange}>
        Show prices
      </Toggle>,
    );
    const toggle = screen.getByRole("switch", { name: "Show prices" });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("can be switched off from the keyboard", async () => {
    const onChange = vi.fn();
    render(
      <Toggle checked onChange={onChange}>
        Show prices
      </Toggle>,
    );
    screen.getByRole("switch").focus();
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("ignores clicks when disabled", async () => {
    const onChange = vi.fn();
    render(
      <Toggle checked={false} onChange={onChange} disabled>
        Show prices
      </Toggle>,
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
