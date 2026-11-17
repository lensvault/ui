import { describe, expect, it } from "vitest";
import { isExternalHref } from "./is-external-href.js";

describe("isExternalHref", () => {
  it("is true for http and https URLs on another origin", () => {
    expect(isExternalHref("https://example.com/")).toBe(true);
    expect(isExternalHref("http://example.com/lenses")).toBe(true);
    expect(isExternalHref("//example.com/lenses")).toBe(true);
  });

  it("is false for paths and URLs on this origin", () => {
    expect(isExternalHref("/lenses")).toBe(false);
    expect(isExternalHref("lenses?sort=name")).toBe(false);
    expect(isExternalHref("#top")).toBe(false);
    expect(isExternalHref(`${window.location.origin}/lenses`)).toBe(false);
  });

  it("is false for mail, phone and other non-web links", () => {
    expect(isExternalHref("mailto:someone@example.com")).toBe(false);
    expect(isExternalHref("tel:+61200000000")).toBe(false);
    expect(isExternalHref("data:text/plain,hi")).toBe(false);
  });
});
