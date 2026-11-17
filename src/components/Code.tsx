import type { ReactNode } from "react";
import s from "./Code.module.css";

export function Code({ children }: { children: ReactNode }) {
  return <code className={s.code}>{children}</code>;
}
