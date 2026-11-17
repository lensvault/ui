import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
export type ButtonVariant = "normal" | "primary" | "icon" | "inline";
interface ButtonLookProps {
    variant?: ButtonVariant;
    children?: ReactNode;
}
type ButtonAsButtonProps = ButtonLookProps & {
    href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsLinkProps = ButtonLookProps & {
    href: string;
    disabled?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
export declare function Button(props: ButtonProps): import("react").JSX.Element;
export {};
