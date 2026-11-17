export const tokenNames = [
  "bg",
  "surface",
  "raised",
  "ink",
  "muted",
  "line",
  "accent",
  "accentInk",
  "selected",
  "selectedInk",
  "offTrack",
  "offKnob",
  "onTrack",
  "onKnob",
  "warn",
  "bad",
  "good",
  "shadow",
  "font",
  "fontDisplay",
  "fontMono",
  "fontMonoDisplay",
  "fontSize",
  "radius",
  "radiusSmall",
  "gapXs",
  "gapS",
  "gapM",
  "gapL",
  "controlHeight",
] as const;

export type TokenName = (typeof tokenNames)[number];

export type Tokens = Readonly<Record<TokenName, string>>;

export interface Theme {
  readonly light: Tokens;
  readonly dark: Tokens;
}

export function defineTheme(theme: Theme): Theme {
  return theme;
}

export function cssVariableName(token: TokenName): string {
  return `--lv-${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

function hasEveryToken(record: Partial<Record<TokenName, string>>): record is Tokens {
  return tokenNames.every((name) => record[name] !== undefined);
}

export function mapTokens(value: (token: TokenName) => string): Tokens {
  const record = Object.fromEntries(tokenNames.map((name) => [name, value(name)]));
  if (!hasEveryToken(record)) throw new Error("mapTokens missed a token");
  return record;
}
