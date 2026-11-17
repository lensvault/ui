import type { SelectHTMLAttributes } from "react";
import { cx } from "./cx.js";
import { useFieldControlIds } from "./field-control.js";
import s from "./input.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectProps = {
  options: readonly SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ options, className, ...rest }: SelectProps) {
  const ids = useFieldControlIds(rest);
  return (
    <select className={cx(s.input, className)} {...rest} {...ids}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
