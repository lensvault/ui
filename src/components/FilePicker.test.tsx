import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilePicker } from "./FilePicker.js";

const sample = new File(["x".repeat(2048)], "route.gpx", { type: "application/gpx+xml" });

function fileInput(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector("input[type=file]");
  if (!(input instanceof HTMLInputElement)) throw new Error("No file input");
  return input;
}

function drop(target: HTMLElement, file: File) {
  const event = createEvent.drop(target);
  Object.defineProperty(event, "dataTransfer", { value: { files: [file] } });
  fireEvent(target, event);
}

function dragLeave(target: HTMLElement, relatedTarget: Element) {
  const event = createEvent.dragLeave(target);
  Object.defineProperty(event, "relatedTarget", { value: relatedTarget });
  fireEvent(target, event);
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
    expect(screen.getByText("2 kB")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove route.gpx" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("takes a dropped file that matches accept", () => {
    const onChange = vi.fn();
    render(<FilePicker onChange={onChange} accept=".gpx" buttonText="Choose a route" />);
    drop(screen.getByRole("group", { name: "Choose a route" }), sample);
    expect(onChange).toHaveBeenCalledWith(sample);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("refuses a dropped file that doesn't match accept, and says why", () => {
    const onChange = vi.fn();
    render(<FilePicker onChange={onChange} accept=".gpx, image/*" buttonText="Choose a route" />);
    const photo = new File(["x"], "notes.txt", { type: "text/plain" });
    drop(screen.getByRole("group", { name: "Choose a route" }), photo);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "notes.txt isn't a file this takes. It takes .gpx, image/*.",
    );
  });

  it("stays highlighted while a drag moves over its button", () => {
    render(<FilePicker onChange={vi.fn()} buttonText="Choose a route" />);
    const picker = screen.getByRole("group", { name: "Choose a route" });
    const before = picker.className;
    fireEvent.dragOver(picker);
    const highlighted = picker.className;
    expect(highlighted).not.toBe(before);
    dragLeave(picker, screen.getByRole("button", { name: "Choose a route" }));
    expect(picker.className).toBe(highlighted);
    dragLeave(picker, document.body);
    expect(picker.className).toBe(before);
  });
});
