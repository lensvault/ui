import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Notice } from "./Notice.js";

describe("Notice", () => {
  it("is a polite status by default", () => {
    render(<Notice>Saved</Notice>);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });

  it("is an alert for errors", () => {
    render(<Notice error>Couldn't save</Notice>);
    expect(screen.getByRole("alert")).toHaveTextContent("Couldn't save");
  });
});
