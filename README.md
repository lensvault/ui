# @lensvault/ui

Shared design system for LensVault and tedbarrett.me, installed from GitHub at a pinned tag.

It holds the theme tokens and the shared controls (Button, Card, Field, Table and so on), styled with CSS modules that take every colour from the theme. Each site defines its own light and dark theme in TypeScript. Nothing goes on npm.

## Using it in a site

1. Install it at a tag:

   ```sh
   pnpm add github:lensvault/ui#v0.1.0
   ```

   (`npm install github:lensvault/ui#v0.1.0` works the same way.)

2. Define the site's theme. A missing token is a type error:

   ```ts
   import { defineTheme } from "@lensvault/ui";

   export const theme = defineTheme({
     light: { bg: "#f7f7f5", ink: "#1b1f25" /* every other token */ },
     dark: { bg: "#13161a", ink: "#e6e8eb" /* every other token */ },
   });
   ```

3. Put the theme's CSS variables and the components' stylesheet in `<head>`:

   ```tsx
   import { themeCss } from "@lensvault/ui";
   import "@lensvault/ui/styles.css";

   <style>{themeCss(theme)}</style>;
   ```

   The theme follows the system's light or dark setting. Setting `data-theme="light"` or `data-theme="dark"` on `<html>` overrides it; any other value, or none, follows the system.

4. Use the components, and `vars` for anything drawn in JavaScript:

   ```tsx
   import { Button, Card, varNames, vars } from "@lensvault/ui";

   <Card heading="Lenses">
     <Button variant="primary">Compare</Button>
   </Card>;

   context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
     varNames.accent,
   );
   ```

   `vars.accent` is `var(--lv-accent)`, for inline styles and SVG. `varNames.accent` is `--lv-accent`, for reading the current value. Canvas code reads the value and redraws when the theme changes.

`Field` labels a `TextInput`, `TextArea` or `Select` inside it and ties its hint and error to it. The control always takes the field's id, and any `id` set on it is ignored; to choose the id, set it on `Field` (`<Field id="lens-name" label="Name">`). Outside a `Field`, a control keeps its own `id`. For any other control, pass a function as its children: it gets `{ id, describedBy }` to put on the control.

`Link` and `Button` with `href` open every absolute `http` or `https` URL (including `//host/...`) in a new tab, and every other link in the same tab. Link to pages on the same site with relative paths (`/lenses`), never full URLs, so they stay in the tab.

Links inside a site go through its router. `Link` is a plain `<a>`; wrap the router's own link with `className={linkClassName}` to get the same look.

## How it ships

The built package (`dist/`: JavaScript, type declarations and `styles.css`) is committed. pnpm 10 won't run a git dependency's build script unless every site adds it to `onlyBuiltDependencies`, and building on install would also pull in all the dev tools. CI fails if `dist/` doesn't match a fresh build, so run `pnpm bundle` and commit `dist/` with each change. The script is deliberately not called `build`, because npm prepares (installs the dev tools of) any git dependency with a `build`, `prepare` or install script.

AI assistants: read [`CLAUDE.md`](CLAUDE.md) first.
