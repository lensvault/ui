const units = [
  { unit: "gigabyte", sizeBytes: 1e9 },
  { unit: "megabyte", sizeBytes: 1e6 },
  { unit: "kilobyte", sizeBytes: 1e3 },
] as const;

export function formatFileSize(sizeBytes: number, locale?: string): string {
  const match = units.find(({ sizeBytes: unitBytes }) => sizeBytes >= unitBytes);
  const format = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: match?.unit ?? "byte",
    unitDisplay: "short",
    maximumFractionDigits: match ? 1 : 0,
  });
  return format.format(sizeBytes / (match?.sizeBytes ?? 1));
}
