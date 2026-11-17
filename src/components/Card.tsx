import type { ReactNode } from "react";
import s from "./Card.module.css";
import { cx } from "./cx.js";
import { hasContent } from "./has-content.js";
import t from "./text.module.css";

const headingTags = { 1: "h1", 2: "h2", 3: "h3" } as const;

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

export function Card({
  media,
  eyebrow,
  heading,
  headingLevel = 2,
  description,
  actions,
  footer,
  className,
  children,
}: CardProps) {
  const Heading = headingTags[headingLevel];
  const hasHead = hasContent(heading) || hasContent(eyebrow) || hasContent(actions);
  return (
    <section className={cx(t.text, s.card, className)}>
      {hasContent(media) && <div className={s.media}>{media}</div>}
      <div className={s.body}>
        {hasHead && (
          <div className={s.head}>
            <div>
              {hasContent(eyebrow) && <p className={s.eyebrow}>{eyebrow}</p>}
              {hasContent(heading) && <Heading className={s.heading}>{heading}</Heading>}
              {hasContent(description) && <p className={s.description}>{description}</p>}
            </div>
            {actions}
          </div>
        )}
        {children}
      </div>
      {hasContent(footer) && <div className={s.footer}>{footer}</div>}
    </section>
  );
}
