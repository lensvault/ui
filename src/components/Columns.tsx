import type { CSSProperties, ReactNode } from "react";
import s from "./Columns.module.css";
import { cx } from "./cx.js";
import t from "./text.module.css";

export interface ColumnsProps {
  min?: string;
  className?: string;
  children: ReactNode;
}

export function Columns({ min = "260px", className, children }: ColumnsProps) {
  const style: CSSProperties & Record<"--columns-min", string> = { "--columns-min": min };
  return (
    <div className={cx(t.text, s.columns, className)} style={style}>
      {children}
    </div>
  );
}
