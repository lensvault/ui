import type { ButtonHTMLAttributes, ReactNode } from "react";
export type ButtonVariant = "normal" | "primary" | "icon" | "inline";
export type ButtonProps = {
    variant?: ButtonVariant;
    href?: string;
    children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export declare function Button({ variant, href, className, children, ...rest }: ButtonProps): import("react").JSX.Element;
