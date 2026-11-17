# To do

Nothing here starts without Ted's go.

1. Tag `v0.1.0` on `main` once this first slice is merged.
2. Move tedbarrett.me onto the package: its theme as a `defineTheme` object, `Link` wrapping react-router's link with `linkClassName`, and `Table` columns given an `id`.
3. Use the package in LensVault's `apps/web`.
4. Light and dark switching: the inline `<head>` script that sets `data-theme` from the saved choice, and a control for system, light or dark.
5. Run the unit tests against React 18 in CI as well as React 19.
6. A page that shows every component in both themes, for checking the look by eye.
