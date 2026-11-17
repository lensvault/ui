import type { SelectHTMLAttributes } from "react";
export interface SelectOption {
    value: string;
    label: string;
}
export type SelectProps = {
    options: readonly SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;
export declare function Select({ options, className, ...rest }: SelectProps): import("react").JSX.Element;
