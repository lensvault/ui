import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field.js";
import { Select } from "./Select.js";
import { TextArea } from "./TextArea.js";
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

  it("labels and describes a control given as plain children", () => {
    render(
      <>
        <Field label="Name" hint="As printed on the lens" error="Required">
          <TextInput />
        </Field>
        <Field label="Notes">
          <TextArea />
        </Field>
        <Field label="Mount" hint="Pick one">
          <Select options={[{ value: "e", label: "Sony E" }]} />
        </Field>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAccessibleDescription(
      "As printed on the lens Required",
    );
    expect(screen.getByRole("textbox", { name: "Notes" })).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("combobox", { name: "Mount" })).toHaveAccessibleDescription("Pick one");
  });

  it("keeps a control's own description alongside the field's", () => {
    render(
      <>
        <p id="units">Millimetres</p>
        <Field label="Focal length" hint="Shortest end">
          <TextInput aria-describedby="units" />
        </Field>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Focal length" })).toHaveAccessibleDescription(
      "Shortest end Millimetres",
    );
  });

  it("gives a control inside it the field's id, not the control's own", () => {
    render(
      <Field id="lens-name" label="Name">
        <TextInput id="ignored" />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("id", "lens-name");
  });

  it("keeps the label working when a control brings its own id", () => {
    render(
      <Field label="Name">
        <TextInput id="own" />
      </Field>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });

  it("leaves a control's own id alone outside a field", () => {
    render(<TextInput id="own" aria-label="Name" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("id", "own");
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
