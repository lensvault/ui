import { type ReactNode } from "react";
import { type FieldControlIds } from "./field-control.js";
export interface FieldProps {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    className?: string;
    children: ReactNode | ((ids: FieldControlIds) => ReactNode);
}
export declare function Field({ label, hint, error, className, children }: FieldProps): import("react").JSX.Element;
