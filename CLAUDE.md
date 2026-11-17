# Working rules for AI assistants

`@lensvault/ui` is the design system shared by LensVault and tedbarrett.me. `README.md` says how a site uses it. These rules are a short version of LensVault's (`lensvault/lensvault`, `CLAUDE.md`).

## Asking and confirming

- Get Ted's go on a plan for each piece of work. Work in an agreed plan then starts without a further go; anything outside it needs one. Agreeing on a design isn't a go.
- Ask before a big architecture decision or a new runtime dependency. The package has none: `react` and `react-dom` are peer dependencies (`^18.3.0 || ^19.0.0`, because tedbarrett.me is on React 18).
- Don't rewrite Ted's own wording unless asked.
- **Never delete a remote branch** without Ted's explicit written approval naming that branch. GitHub deletes a pull request's branch when Ted merges it; that merge is his approval for that branch only.
- Open work goes in `TODO.md`. Nothing on it starts without Ted's go. Remove an item in the commit that finishes it.

## Git and releases

Work goes into `main` only through pull requests, and Ted's merge is the go.

- Work on a branch named `claude/<topic>`, one per piece of work. Push it after every commit, so nothing lives only in a container. No go is needed to push a branch.
- Open every pull request as a **draft**. GitHub won't merge a draft, and Ted doesn't merge drafts. Review it with `/code-review`, fix what it finds, and check CI passes; only then mark it ready for review and tell Ted it's ready, with a link and what to look at on screen. Anything not a draft is Ted's to review and merge. Never push to `main` and never merge a pull request yourself, unless Ted asks you to merge one by its number.
- Keep each pull request to one piece of work. After another one merges, merge `main` into your branch rather than rebasing it.
- Commit in small steps; imperative subject, body says why. Run `pnpm check` before every commit.
- End every commit message with `Co-Authored-By: Ted Barrett <21516680+Ted-Barrett@users.noreply.github.com>`, alongside Claude's own lines.
- `dist/` is committed, because sites install from a git tag (see `README.md`). Run `pnpm build` and commit `dist/` with the source change; CI fails if they differ.
- A release is a version bump in `package.json`, built and committed and merged through a pull request, then a tag `vX.Y.Z` on `main`. Sites move to it by changing the tag they install.
- Dependabot opens one grouped pull request a week for minor and patch updates. Its 7-day cooldown matches `minimumReleaseAge` in `pnpm-workspace.yaml`; keep the two in step, and don't add a version newer than 7 days.

## Commands

Node 24 (`.nvmrc`) and pnpm 10.28.0 (`packageManager`; run `corepack enable` once). Claude's cloud sessions put Node 22 first: run `export PATH=/opt/node24/bin:$PATH && corepack enable` before other commands.

- `pnpm install`: install everything.
- `pnpm check`: Prettier check, Stylelint, ESLint, typecheck, knip, unit tests, then the build. Run before every commit.
- `pnpm test`: unit tests only (Vitest, jsdom, Testing Library).
- `pnpm build`: write `dist/` (Vite for the JavaScript and `styles.css`, `tsc` for the types).
- `pnpm format`: fix formatting.

Linting is strict and warnings fail. Fix the code rather than switching a rule off; if a rule is truly wrong for a case, disable it on that line with the reason.

## Themes

- Tokens are listed once, in `tokenNames` (`src/theme/theme.ts`). Adding one is a breaking change for every site's theme, so it needs a new minor version at least.
- CSS variables are `--lv-` plus the token in kebab case (`accentInk` is `--lv-accent-ink`).
- `themeCss` writes light by default, dark when the system prefers it, and `data-theme` to override. Keep it that way: the server sends the same HTML whatever the theme.

## Components

- One component per file in `src/components`, with its own CSS module, exported from `src/index.ts`.
- CSS modules use only theme tokens (`var(--lv-...)`). Stylelint rejects raw colours, and `styles.test.ts` rejects unknown variables and classes a module doesn't define.
- Corners stay small and sharp (`--lv-radius`, `--lv-radius-small`).
- Styling is CSS only: React state never picks a colour.
- Test behaviour with Testing Library (roles, labels, events), not pixel snapshots.

## Code rules

1. Almost no comments: names and types explain. A comment is only for a _why_ the code can't show.
2. No `any`, no `as` casts (except `as const`), no `!` non-null assertions.
3. No emojis, no commented-out code, no `TODO` comments.
4. Named exports only, except config files.
5. No abstraction before the third use.
6. Units in names (`widthPx`, `durationMs`).
7. Never swallow errors; throw `Error` objects with a clear message.
8. Every bug fix gets a test that would have caught it.
9. Never commit personal information.
