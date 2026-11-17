import { describe, expect, it } from "vitest";
import { formatFileSize } from "./format-file-size.js";

describe("formatFileSize", () => {
  it("picks the unit by size", () => {
    expect(formatFileSize(512, "en-US")).toBe("512 byte");
    expect(formatFileSize(2048, "en-US")).toBe("2 kB");
    expect(formatFileSize(3_450_000, "en-US")).toBe("3.5 MB");
    expect(formatFileSize(12_300_000_000, "en-US")).toBe("12.3 GB");
  });

  it("formats for the locale", () => {
    expect(formatFileSize(3_450_000, "de-DE")).toBe("3,5 MB");
  });
});
