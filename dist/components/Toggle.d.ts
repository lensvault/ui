import type { ReactNode } from "react";
export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    children: ReactNode;
}
export declare function Toggle({ checked, onChange, disabled, children }: ToggleProps): import("react").JSX.Element;
