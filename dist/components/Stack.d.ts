import type { CSSProperties, ReactNode } from "react";
export type Gap = "xs" | "s" | "m" | "l";
export interface StackProps {
    gap?: Gap;
    row?: boolean;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}
export declare function Stack({ gap, row, className, style, children }: StackProps): import("react").JSX.Element;
