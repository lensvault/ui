import type { TextareaHTMLAttributes } from "react";
import { cx } from "./cx.js";
import { useFieldControlIds } from "./field-control.js";
import s from "./input.module.css";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...rest }: TextAreaProps) {
  const ids = useFieldControlIds(rest);
  return <textarea className={cx(s.input, s.multiline, className)} {...rest} {...ids} />;
}
