import type { InputHTMLAttributes } from "react";
import { cx } from "./cx.js";
import s from "./input.module.css";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...rest }: TextInputProps) {
  return <input className={cx(s.input, className)} {...rest} />;
}
