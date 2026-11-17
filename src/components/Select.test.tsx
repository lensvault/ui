import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select.js";

describe("Select", () => {
  it("lists its options and reports the chosen one", async () => {
    const onChange = vi.fn();
    render(
      <Select
        aria-label="Mount"
        defaultValue="ef"
        onChange={(event) => {
          onChange(event.target.value);
        }}
        options={[
          { value: "ef", label: "Canon EF" },
          { value: "e", label: "Sony E" },
        ]}
      />,
    );
    const select = screen.getByRole("combobox", { name: "Mount" });
    expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual([
      "Canon EF",
      "Sony E",
    ]);
    await userEvent.selectOptions(select, "Sony E");
    expect(onChange).toHaveBeenCalledWith("e");
  });
});
