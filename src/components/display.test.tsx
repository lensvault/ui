import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Code } from "./Code.js";
import { Columns } from "./Columns.js";
import { Details } from "./Details.js";
import { KeyLabel } from "./KeyLabel.js";
import { Progress } from "./Progress.js";
import { Spinner } from "./Spinner.js";
import { Stack } from "./Stack.js";
import { Tip } from "./Tip.js";

describe("Progress", () => {
  it("is a labelled progress bar", () => {
    render(<Progress value={0.4} label="Uploading" />);
    expect(screen.getByRole("progressbar", { name: "Uploading" })).toHaveAttribute("value", "0.4");
  });
});

describe("Spinner", () => {
  it("says what is loading", () => {
    render(<Spinner label="Loading prices" />);
    expect(screen.getByRole("status", { name: "Loading prices" })).toBeInTheDocument();
  });
});

describe("Details", () => {
  it("opens when its summary is clicked", async () => {
    render(<Details summary="More">Hidden text</Details>);
    const details = screen.getByRole("group");
    expect(details).not.toHaveAttribute("open");
    await userEvent.click(screen.getByText("More"));
    expect(details).toHaveAttribute("open");
  });
});

describe("Tip", () => {
  it("shows its detail on hover", () => {
    render(<Tip tip="Approximate, from the maker">24 mm</Tip>);
    expect(screen.getByText("24 mm")).toHaveAttribute("title", "Approximate, from the maker");
  });
});

describe("Columns", () => {
  it("sets the narrowest column width", () => {
    render(
      <Columns min="300px">
        <p>One</p>
      </Columns>,
    );
    const columns = screen.getByText("One").parentElement;
    expect(columns?.style.getPropertyValue("--columns-min")).toBe("300px");
  });
});

describe("Stack, KeyLabel and Code", () => {
  it("render their children", () => {
    render(
      <Stack row gap="s">
        <KeyLabel>Mount</KeyLabel>
        <Code>EF</Code>
      </Stack>,
    );
    expect(screen.getByText("Mount")).toBeInTheDocument();
    expect(screen.getByText("EF").tagName).toBe("CODE");
  });
});
