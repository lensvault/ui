import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table, type TableColumn } from "./Table.js";

interface Lens {
  id: string;
  name: string;
  focalLengthMm: number;
}

const lenses: Lens[] = [
  { id: "a", name: "Wide", focalLengthMm: 24 },
  { id: "b", name: "Tele", focalLengthMm: 200 },
];

const columns: TableColumn<Lens>[] = [
  { id: "name", header: "Name", cell: (lens) => lens.name },
  { id: "focal", header: "Focal length", cell: (lens) => `${String(lens.focalLengthMm)} mm` },
];

describe("Table", () => {
  it("shows one row per item and one column per field", () => {
    render(<Table items={lenses} rowKey={(lens) => lens.id} columns={columns} caption="Lenses" />);
    const table = screen.getByRole("table", { name: "Lenses" });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .map((th) => th.textContent),
    ).toEqual(["Name", "Focal length"]);
    const rows = within(table).getAllByRole("row").slice(1);
    expect(
      rows.map((row) =>
        within(row)
          .getAllByRole("cell")
          .map((td) => td.textContent),
      ),
    ).toEqual([
      ["Wide", "24 mm"],
      ["Tele", "200 mm"],
    ]);
  });

  it("shows just the headers when there are no items", () => {
    render(<Table items={[]} rowKey={(lens: Lens) => lens.id} columns={columns} />);
    expect(screen.getAllByRole("row")).toHaveLength(1);
  });
});
