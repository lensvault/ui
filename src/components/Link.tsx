import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx.js";
import { isExternalHref } from "./is-external-href.js";
import s from "./Link.module.css";

export const linkClassName = s.link ?? "";

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
