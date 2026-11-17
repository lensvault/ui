import type { ReactNode } from "react";
import s from "./KeyLabel.module.css";

export function KeyLabel({ children }: { children: ReactNode }) {
  return <div className={s.key}>{children}</div>;
}
