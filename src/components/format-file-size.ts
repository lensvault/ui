const units = [
  { unit: "gigabyte", sizeBytes: 1e9 },
  { unit: "megabyte", sizeBytes: 1e6 },
  { unit: "kilobyte", sizeBytes: 1e3 },
] as const;

export function formatFileSize(sizeBytes: number, locale?: string): string {
  const match = units.find(({ sizeBytes: unitBytes }) => sizeBytes >= unitBytes);
  if (!match) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(sizeBytes)} B`;
  }
  const format = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: match.unit,
    unitDisplay: "short",
    maximumFractionDigits: 1,
  });
  return format.format(sizeBytes / match.sizeBytes);
}
