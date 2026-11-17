import type { ReactNode } from "react";
import { cx } from "./cx.js";
import { useFieldControlIds } from "./field-control.js";
import t from "./text.module.css";
import s from "./Toggle.module.css";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
  id?: string;
  "aria-describedby"?: string;
}

export function Toggle({ checked, onChange, disabled = false, children, ...rest }: ToggleProps) {
  const ids = useFieldControlIds(rest);
  return (
    <label className={cx(t.text, s.toggle)}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        {...ids}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      <span>{children}</span>
    </label>
  );
}
