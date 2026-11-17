import type { ReactNode } from "react";
import { cx } from "./cx.js";
import { hasContent } from "./has-content.js";
import s from "./Table.module.css";
import t from "./text.module.css";

export interface TableColumn<T> {
  id: string;
  header: ReactNode;
  cell: (item: T) => ReactNode;
}

export interface TableProps<T> {
  items: readonly T[];
  rowKey: (item: T) => string;
  columns: readonly TableColumn<T>[];
  caption?: ReactNode;
  className?: string;
}

export function Table<T>({ items, rowKey, columns, caption, className }: TableProps<T>) {
  return (
    <table className={cx(t.text, s.table, className)}>
      {hasContent(caption) && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={rowKey(item)}>
            {columns.map((column) => (
              <td key={column.id}>{column.cell(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
