import type { AnchorHTMLAttributes, ReactNode } from "react";
export declare const linkClassName: string;
export type LinkProps = {
    href: string;
    children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;
export declare function Link({ href, className, children, ...rest }: LinkProps): import("react").JSX.Element;
