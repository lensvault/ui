import type { ReactNode } from "react";
export interface CardProps {
    media?: ReactNode;
    eyebrow?: ReactNode;
    heading?: ReactNode;
    headingLevel?: 1 | 2 | 3;
    description?: ReactNode;
    actions?: ReactNode;
    footer?: ReactNode;
    className?: string;
    children?: ReactNode;
}
export declare function Card({ media, eyebrow, heading, headingLevel, description, actions, footer, className, children, }: CardProps): import("react").JSX.Element;
