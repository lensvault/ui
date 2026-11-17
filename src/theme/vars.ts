import { cssVariableName, mapTokens } from "./theme.js";

export const varNames = mapTokens(cssVariableName);

export const vars = mapTokens((token) => `var(${cssVariableName(token)})`);
