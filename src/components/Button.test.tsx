import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button.js";

describe("Button", () => {
  it("is a plain button that doesn't submit forms", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("can still be a submit button", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute("type", "submit");
  });

  it("doesn't fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("becomes a link opening in a new tab when given href", () => {
    render(
      <Button href="https://example.com/" aria-label="Open example" variant="primary">
        Go
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Open example" });
    expect(link).toHaveAttribute("href", "https://example.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("opens a link on this site in the same tab", () => {
    render(<Button href="/lenses">Lenses</Button>);
    const link = screen.getByRole("link", { name: "Lenses" });
    expect(link).toHaveAttribute("href", "/lenses");
    expect(link).not.toHaveAttribute("target");
  });

  it("passes link props through", () => {
    const onClick = vi.fn((event: { preventDefault: () => void }) => {
      event.preventDefault();
    });
    render(
      <Button href="/lenses" id="lenses" data-section="nav" target="_self" onClick={onClick}>
        Lenses
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Lenses" });
    expect(link).toHaveAttribute("id", "lenses");
    expect(link).toHaveAttribute("data-section", "nav");
    expect(link).toHaveAttribute("target", "_self");
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("makes a disabled link go nowhere", () => {
    const onClick = vi.fn();
    render(
      <Button href="/lenses" disabled onClick={onClick}>
        Lenses
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Lenses" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("gives each variant a different look", () => {
    render(
      <>
        <Button>normal</Button>
        <Button variant="primary">primary</Button>
        <Button variant="icon" aria-label="icon">
          +
        </Button>
        <Button variant="inline">inline</Button>
      </>,
    );
    const classes = screen.getAllByRole("button").map((button) => button.className);
    expect(new Set(classes).size).toBe(4);
  });

  it("keeps a class name passed in", () => {
    render(<Button className="extra">Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("extra");
  });
});
