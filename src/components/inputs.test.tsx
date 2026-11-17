import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TextArea } from "./TextArea.js";
import { TextInput } from "./TextInput.js";

describe("TextInput and TextArea", () => {
  it("take typing and pass their props through", async () => {
    render(
      <>
        <TextInput aria-label="Name" placeholder="Lens name" />
        <TextArea aria-label="Notes" rows={4} />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    const area = screen.getByRole("textbox", { name: "Notes" });
    await userEvent.type(input, "Wide");
    await userEvent.type(area, "Sharp");
    expect(input).toHaveValue("Wide");
    expect(input).toHaveAttribute("placeholder", "Lens name");
    expect(area).toHaveValue("Sharp");
    expect(area).toHaveAttribute("rows", "4");
  });
});
