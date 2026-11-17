import type { InputHTMLAttributes } from "react";
import { cx } from "./cx.js";
import { useFieldControlIds } from "./field-control.js";
import s from "./input.module.css";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...rest }: TextInputProps) {
  const ids = useFieldControlIds(rest);
  return <input className={cx(s.input, className)} {...rest} {...ids} />;
}
