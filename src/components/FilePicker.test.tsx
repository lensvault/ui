import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilePicker } from "./FilePicker.js";

const sample = new File(["x".repeat(2048)], "route.gpx", { type: "application/gpx+xml" });

function fileInput(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector("input[type=file]");
  if (!(input instanceof HTMLInputElement)) throw new Error("No file input");
  return input;
}

describe("FilePicker", () => {
  it("reports the chosen file", async () => {
    const onChange = vi.fn();
    const { container } = render(<FilePicker onChange={onChange} accept=".gpx" />);
    expect(fileInput(container)).toHaveAttribute("accept", ".gpx");
    await userEvent.upload(fileInput(container), sample);
    expect(onChange).toHaveBeenCalledWith(sample);
  });

  it("opens the file chooser from its button", async () => {
    const { container } = render(<FilePicker onChange={vi.fn()} buttonText="Choose a route" />);
    const click = vi.spyOn(fileInput(container), "click");
    await userEvent.click(screen.getByRole("button", { name: "Choose a route" }));
    expect(click).toHaveBeenCalledOnce();
  });

  it("shows the chosen file with its size, and removes it", async () => {
    const onChange = vi.fn();
    render(<FilePicker file={sample} onChange={onChange} />);
    expect(screen.getByText("route.gpx", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("2.00 KB")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove route.gpx" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
