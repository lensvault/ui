import type { ReactNode } from "react";
import { cx } from "./cx.js";
import s from "./Details.module.css";
import { linkClassName } from "./Link.js";
import t from "./text.module.css";

export function Details({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  return (
    <details className={cx(t.text, s.details)}>
      <summary className={cx(linkClassName, s.summary)}>{summary}</summary>
      {children}
    </details>
  );
}
