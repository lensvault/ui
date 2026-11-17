export declare const tokenNames: readonly ["bg", "surface", "raised", "ink", "muted", "line", "accent", "accentInk", "selected", "selectedInk", "offTrack", "offKnob", "onTrack", "onKnob", "warn", "bad", "good", "shadow", "font", "fontDisplay", "fontMono", "fontMonoDisplay", "fontSize", "radius", "radiusSmall", "gapXs", "gapS", "gapM", "gapL", "controlHeight"];
export type TokenName = (typeof tokenNames)[number];
export type Tokens = Readonly<Record<TokenName, string>>;
export interface Theme {
    readonly light: Tokens;
    readonly dark: Tokens;
}
export declare function defineTheme(theme: Theme): Theme;
export declare function cssVariableName(token: TokenName): string;
export declare function mapTokens(value: (token: TokenName) => string): Tokens;
