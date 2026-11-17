import type { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";
import { cx } from "./cx.js";

export type ButtonVariant = "normal" | "primary" | "icon" | "inline";

const variantClass: Record<ButtonVariant, string | undefined> = {
  normal: undefined,
  primary: s.primary,
  icon: s.icon,
  inline: s.inline,
};

export type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "normal", href, className, children, ...rest }: ButtonProps) {
  const classes = cx(s.button, variantClass[variant], className);
  if (href !== undefined) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        aria-label={rest["aria-label"]}
        title={rest.title}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
