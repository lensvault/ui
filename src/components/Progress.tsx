import { cx } from "./cx.js";
import s from "./Progress.module.css";
import t from "./text.module.css";

export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className={cx(t.text, s.field)}>
      <span aria-hidden>{label}</span>
      <progress className={s.progress} value={value} max={1} aria-label={label} />
    </div>
  );
}
