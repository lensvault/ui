import type { ReactNode } from "react";
export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    children: ReactNode;
    id?: string;
    "aria-describedby"?: string;
}
export declare function Toggle({ checked, onChange, disabled, children, ...rest }: ToggleProps): import("react").JSX.Element;
