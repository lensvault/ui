import { type ReactNode, useId } from "react";
import { cx } from "./cx.js";
import { hasContent } from "./has-content.js";
import s from "./Field.module.css";
import t from "./text.module.css";

export interface FieldControlIds {
  id: string;
  describedBy: string | undefined;
}

export interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode | ((ids: FieldControlIds) => ReactNode);
}

export function Field({ label, hint, error, className, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasHint = hasContent(hint);
  const hasError = hasContent(error);
  const describedBy = cx(hasHint && hintId, hasError && errorId) || undefined;
  return (
    <div className={cx(t.text, s.field, className)}>
      {hasContent(label) && (
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
      )}
      {hasHint && (
        <span id={hintId} className={s.hint}>
          {hint}
        </span>
      )}
      {typeof children === "function" ? children({ id, describedBy }) : children}
      {hasError && (
        <span id={errorId} className={s.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
