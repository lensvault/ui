const absoluteUrl = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const webProtocols = new Set(["http:", "https:"]);

export function isExternalHref(href: string): boolean {
  if (!absoluteUrl.test(href)) return false;
  const pageOrigin = typeof window === "undefined" ? undefined : window.location.origin;
  const base = pageOrigin ?? "https://page.invalid";
  if (!URL.canParse(href, base)) return false;
  const url = new URL(href, base);
  return webProtocols.has(url.protocol) && url.origin !== pageOrigin;
}
