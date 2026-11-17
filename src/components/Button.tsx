import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";
import { cx } from "./cx.js";
import { isExternalHref } from "./is-external-href.js";

export type ButtonVariant = "normal" | "primary" | "icon" | "inline";

const variantClass: Record<ButtonVariant, string | undefined> = {
  normal: undefined,
  primary: s.primary,
  icon: s.icon,
  inline: s.inline,
};

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

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = "normal", href, disabled = false, className, children, ...rest } = props;
    const classes = cx(s.button, variantClass[variant], className);
    if (disabled) {
      return (
        <span
          role="link"
          aria-disabled="true"
          className={classes}
          aria-label={rest["aria-label"]}
          title={rest.title}
          id={rest.id}
        >
          {children}
        </span>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        {...(isExternalHref(href) ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  const { variant = "normal", className, children, ...rest } = props;
  return (
    <button type="button" className={cx(s.button, variantClass[variant], className)} {...rest}>
      {children}
    </button>
  );
}
