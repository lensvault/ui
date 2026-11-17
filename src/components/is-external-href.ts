const webUrl = /^(?:https?:)?\/\//i;

export function isExternalHref(href: string): boolean {
  return webUrl.test(href);
}
