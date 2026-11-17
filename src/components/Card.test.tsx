import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card.js";

describe("Card", () => {
  it("shows its heading at the level asked for, with the eyebrow and description", () => {
    render(
      <Card eyebrow="Tool" heading="Trip video" headingLevel={3} description="Make a video">
        Body
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Trip video" })).toBeInTheDocument();
    expect(screen.getByText("Tool")).toBeInTheDocument();
    expect(screen.getByText("Make a video")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("defaults to a level 2 heading", () => {
    render(<Card heading="Lenses" />);
    expect(screen.getByRole("heading", { level: 2, name: "Lenses" })).toBeInTheDocument();
  });

  it("shows actions, media and footer", () => {
    render(
      <Card
        heading="Lenses"
        media={<img src="lens.png" alt="A lens" />}
        actions={<button type="button">Edit</button>}
        footer="Updated today"
      />,
    );
    expect(screen.getByRole("img", { name: "A lens" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByText("Updated today")).toBeInTheDocument();
  });

  it("shows a description given without a heading", () => {
    render(<Card description="Make a video">Body</Card>);
    expect(screen.getByText("Make a video")).toBeInTheDocument();
  });

  it("leaves out the head when there is nothing to put in it", () => {
    const { container } = render(<Card heading={false}>Only body</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.querySelectorAll("section > div")).toHaveLength(1);
  });
});
