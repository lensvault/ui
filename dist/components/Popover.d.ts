import { type CSSProperties, type ReactNode } from "react";
export declare function placeBelow(anchor: Pick<DOMRect, "bottom" | "left">, windowWidthPx: number): Pick<CSSProperties, "top" | "left" | "maxWidth">;
export declare function Popover({ label, children }: {
    label: ReactNode;
    children: ReactNode;
}): import("react").JSX.Element;
