import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field.js";
import { TextInput } from "./TextInput.js";

describe("Field", () => {
  it("labels the control it wraps", () => {
    render(<Field label="Name">{({ id }) => <TextInput id={id} />}</Field>);
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });

  it("describes the control with its hint and error", () => {
    render(
      <Field label="Focal length" hint="In millimetres" error="Must be a number">
        {({ id, describedBy }) => <TextInput id={id} aria-describedby={describedBy} />}
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Focal length" })).toHaveAccessibleDescription(
      "In millimetres Must be a number",
    );
  });

  it("reads out the error when it appears", () => {
    render(
      <Field label="Name" error="Required">
        {({ id }) => <TextInput id={id} />}
      </Field>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("gives no description when there is no hint or error", () => {
    let seen: string | undefined = "unset";
    render(
      <Field label="Name">
        {({ id, describedBy }) => {
          seen = describedBy;
          return <TextInput id={id} />;
        }}
      </Field>,
    );
    expect(seen).toBeUndefined();
  });

  it("gives each field its own id", () => {
    render(
      <>
        <Field label="First">{({ id }) => <TextInput id={id} />}</Field>
        <Field label="Second">{({ id }) => <TextInput id={id} />}</Field>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "First" }).id).not.toBe(
      screen.getByRole("textbox", { name: "Second" }).id,
    );
  });

  it("takes plain children too", () => {
    render(
      <Field hint="Optional">
        <TextInput aria-label="Note" />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Note" })).toBeInTheDocument();
  });
});
