import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "./Field.js";
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

  it("is named and described by the Field around it", () => {
    render(
      <Field label="Cover" hint="Shown on the front page">
        <Toggle checked={false} onChange={vi.fn()}>
          Use cover
        </Toggle>
      </Field>,
    );
    const toggle = screen.getByRole("switch");
    expect(screen.getByLabelText("Cover")).toBe(toggle);
    expect(toggle).toHaveAccessibleDescription("Shown on the front page");
  });

  it("joins its own description with the Field's", () => {
    render(
      <Field label="Cover" hint="Shown on the front page">
        <Toggle checked={false} onChange={vi.fn()} aria-describedby="extra">
          Use cover
        </Toggle>
        <p id="extra">Can be changed later</p>
      </Field>,
    );
    expect(screen.getByRole("switch")).toHaveAccessibleDescription(
      "Shown on the front page Can be changed later",
    );
  });
});
