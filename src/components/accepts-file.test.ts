import { describe, expect, it } from "vitest";
import { acceptsFile } from "./accepts-file.js";

const route = new File([""], "Route.GPX", { type: "application/gpx+xml" });
const photo = new File([""], "lens.jpg", { type: "image/jpeg" });

describe("acceptsFile", () => {
  it("accepts anything when there is no accept list", () => {
    expect(acceptsFile(undefined, route)).toBe(true);
    expect(acceptsFile("", route)).toBe(true);
  });

  it("matches extensions whatever their case", () => {
    expect(acceptsFile(".gpx", route)).toBe(true);
    expect(acceptsFile(".kml", route)).toBe(false);
  });

  it("matches exact and wildcard MIME types", () => {
    expect(acceptsFile("application/gpx+xml", route)).toBe(true);
    expect(acceptsFile("image/*", photo)).toBe(true);
    expect(acceptsFile("image/*", route)).toBe(false);
    expect(acceptsFile("image/png", photo)).toBe(false);
  });

  it("accepts a file matching any entry in the list", () => {
    expect(acceptsFile(".kml, image/*", photo)).toBe(true);
    expect(acceptsFile(".kml, .gpx", route)).toBe(true);
  });
});
