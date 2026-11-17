import { type ReactNode, useId, useMemo } from "react";
import { cx } from "./cx.js";
import { FieldControlContext, type FieldControlIds } from "./field-control.js";
import { hasContent } from "./has-content.js";
import s from "./Field.module.css";
import t from "./text.module.css";

export interface FieldProps {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode | ((ids: FieldControlIds) => ReactNode);
}

export function Field({ id: givenId, label, hint, error, className, children }: FieldProps) {
  const generatedId = useId();
  const id = givenId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasHint = hasContent(hint);
  const hasError = hasContent(error);
  const describedBy = cx(hasHint && hintId, hasError && errorId) || undefined;
  const ids = useMemo<FieldControlIds>(() => ({ id, describedBy }), [id, describedBy]);
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
      {/* eslint-disable-next-line @eslint-react/no-context-provider -- React 18 sites need .Provider */}
      <FieldControlContext.Provider value={ids}>
        {typeof children === "function" ? children(ids) : children}
      </FieldControlContext.Provider>
      {hasError && (
        <span id={errorId} className={s.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
