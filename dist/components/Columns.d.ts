import type { ReactNode } from "react";
export interface ColumnsProps {
    min?: string;
    className?: string;
    children: ReactNode;
}
export declare function Columns({ min, className, children }: ColumnsProps): import("react").JSX.Element;
