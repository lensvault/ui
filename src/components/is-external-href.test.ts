import { describe, expect, it } from "vitest";
import { isExternalHref } from "./is-external-href.js";

describe("isExternalHref", () => {
  it("is true for any absolute http or https URL", () => {
    expect(isExternalHref("https://example.com/")).toBe(true);
    expect(isExternalHref("HTTP://example.com/lenses")).toBe(true);
    expect(isExternalHref("//example.com/lenses")).toBe(true);
  });

  it("doesn't depend on the page's origin, so server and browser agree", () => {
    expect(isExternalHref(`${window.location.origin}/lenses`)).toBe(true);
  });

  it("is false for relative paths", () => {
    expect(isExternalHref("/lenses")).toBe(false);
    expect(isExternalHref("lenses?sort=name")).toBe(false);
    expect(isExternalHref("#top")).toBe(false);
  });

  it("is false for mail, phone and other non-web links", () => {
    expect(isExternalHref("mailto:someone@example.com")).toBe(false);
    expect(isExternalHref("tel:+61200000000")).toBe(false);
    expect(isExternalHref("data:text/plain,hi")).toBe(false);
  });
});
