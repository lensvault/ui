import type { ReactNode } from "react";
import { cx } from "./cx.js";
import s from "./Notice.module.css";
import t from "./text.module.css";

export function Notice({ error = false, children }: { error?: boolean; children: ReactNode }) {
  return (
    <div className={cx(t.text, s.notice, error && s.error)} role={error ? "alert" : "status"}>
      {children}
    </div>
  );
}
