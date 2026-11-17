import type { ReactNode } from "react";
import s from "./Tip.module.css";

export function Tip({ tip, children }: { tip: string; children: ReactNode }) {
  return (
    <span className={s.tip} title={tip}>
      {children}
    </span>
  );
}
