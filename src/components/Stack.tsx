import type { CSSProperties, ReactNode } from "react";
import { cx } from "./cx.js";
import s from "./Stack.module.css";
import t from "./text.module.css";

export type Gap = "xs" | "s" | "m" | "l";

const gapClass: Record<Gap, string | undefined> = {
  xs: s.gapXs,
  s: s.gapS,
  m: s.gapM,
  l: s.gapL,
};

export interface StackProps {
  gap?: Gap;
  row?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Stack({ gap = "m", row = false, className, style, children }: StackProps) {
  return (
    <div className={cx(t.text, row ? s.row : s.stack, gapClass[gap], className)} style={style}>
      {children}
    </div>
  );
}
