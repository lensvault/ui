import { type ReactNode } from "react";
export interface FieldControlIds {
    id: string;
    describedBy: string | undefined;
}
export interface FieldProps {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    className?: string;
    children: ReactNode | ((ids: FieldControlIds) => ReactNode);
}
export declare function Field({ label, hint, error, className, children }: FieldProps): import("react").JSX.Element;
