import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx.js";
import s from "./Link.module.css";

export const linkClassName = s.link ?? "";

function isExternalHref(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export type LinkProps = { href: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
>;

export function Link({ href, className, children, ...rest }: LinkProps) {
  const external = isExternalHref(href);
  return (
    <a
      href={href}
      className={cx(linkClassName, className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
