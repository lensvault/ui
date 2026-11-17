import { type CSSProperties, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cx } from "./cx.js";
import { linkClassName } from "./Link.js";
import s from "./Popover.module.css";
import t from "./text.module.css";

const windowMarginPx = 16;
const maxWidthPx = 380;
const gapBelowPx = 6;

export function placeBelow(
  anchor: Pick<DOMRect, "bottom" | "left">,
  windowWidthPx: number,
): Pick<CSSProperties, "top" | "left" | "maxWidth"> {
  const widthPx = Math.min(maxWidthPx, windowWidthPx - 2 * windowMarginPx);
  return {
    top: anchor.bottom + gapBelowPx,
    left: Math.max(windowMarginPx, Math.min(anchor.left, windowWidthPx - windowMarginPx - widthPx)),
    maxWidth: widthPx,
  };
}

export function Popover({ label, children }: { label: ReactNode; children: ReactNode }) {
  const [place, setPlace] = useState<CSSProperties>();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const id = useId();
  const open = place !== undefined;

  useEffect(() => {
    if (!open) return;
    const close = () => {
      setPlace(undefined);
    };
    const replace = () => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (rect) setPlace(placeBelow(rect, window.innerWidth));
    };
    const closeIfOutside = (event: Event) => {
      if (!(event.target instanceof Node) || !wrapRef.current?.contains(event.target)) close();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("resize", replace);
    window.addEventListener("scroll", replace, true);
    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("resize", replace);
      window.removeEventListener("scroll", replace, true);
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className={cx(t.text, s.wrap)}>
      <button
        type="button"
        className={cx(linkClassName, s.button)}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={(event) => {
          setPlace(
            open
              ? undefined
              : placeBelow(event.currentTarget.getBoundingClientRect(), window.innerWidth),
          );
        }}
      >
        {label}
      </button>
      {open && (
        <div id={id} role="dialog" className={s.panel} style={place}>
          {children}
        </div>
      )}
    </span>
  );
}
