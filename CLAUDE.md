# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal resumes in [JSON Resume](https://jsonresume.org/) format. Each file under
`src/schemas/` is an independent, self-contained resume — some are role-tailored
variants of the same person (`resume.json`, `staff.json`, `full-stack.json`,
`backend-ai.json`, `engineering-manager.json`, `distributed-systems.json`), others
belong to a different person entirely (`alina-content-creator.json`). A `_ua` suffix
marks a Ukrainian translation of another schema (e.g. `alina-content-creator_ua.json`).
There is no shared/base schema — each file has all its own content, duplicated as needed.

Rendering: `resumed` renders a schema through a `jsonresume-theme-*` package into HTML,
then Puppeteer prints that HTML to a PDF.

## Commands

```
npm install                              # install dependencies

FILE_NAME=resume npm start               # render src/schemas/resume.json -> dist/resume.pdf
FILE_NAME=resume THEME=elegant-pink npm start   # use a different installed theme

npm run validate:all                     # validate schemas against the JSON Resume schema
npm run typecheck                        # tsc --noEmit
npm run pretty:check                     # check Prettier formatting
npm run pretty:write                     # apply Prettier formatting
```

`FILE_NAME` (required) is a filename under `src/schemas/` without the `.json`
extension. `THEME` (optional, default `even`) is the short name of an installed
`jsonresume-theme-*` package. Both can be set in a local `.env` file (loaded via
`@dotenvx/dotenvx/config`) instead of passing them inline.

There is no test suite and no build step. Node's engine requirement is `>=25`
(`.nvmrc` pins `v25.4.0`).

## Architecture

**`src/index.ts`** — the render entry point. Resolves `FILE_NAME`/`THEME` from env,
dynamically imports `jsonresume-theme-${THEME}` (falling back to importing its
`/dist` subpath — needed for themes like `jsonresume-theme-elegant-pink` whose default
export condition points at unbuilt `.jsx` source that Node can't load directly), reads
`src/schemas/${FILE_NAME}.json`, renders it to HTML via `resumed`, then uses headless
Puppeteer to print that HTML to `dist/${FILE_NAME}.pdf`.

**`src/validate.ts`** — validates schema files via `resumed`'s `validate()`. Its glob
pattern (`${import.meta.dirname}/*.json`) resolves to `src/*.json`, but all schemas
actually live in `src/schemas/`, so this currently matches zero files and silently
validates nothing — `npm run validate:all` (and the pre-commit hook / CI job that run
it) will not catch schema errors as-is.

**TypeScript, no build step**: `.ts` files are run directly by Node 25's native
type-stripping — there is no `tsc` compile step, no `ts-node`, no `tsx`. `tsc` is used
only for `--noEmit` type-checking. `src/types/resumed.d.ts` is a local ambient module
declaration that patches a gap in the `resumed` package: its `package.json` `exports`
field has no `types` condition, so TypeScript can't resolve its shipped `.d.ts` files
without this override.

**Themes are not interchangeable in what they render.** Different
`jsonresume-theme-*` packages support different subsets of the JSON Resume schema and
render fields differently — e.g. `even` renders `basics.image` and parses Markdown
inside `education[].courses` (so `[text](url)` links render as links), while
`elegant-pink` does neither (no photo at all; `courses` items are joined into a plain
comma-separated sentence with the Markdown syntax printed literally). When adding
content that depends on a specific rendering behavior, check it against whichever
theme(s) will actually be used.

**Images**: schema `basics.image` / `work[].url` fields must be real, publicly
fetchable URLs (e.g. `raw.githubusercontent.com/<owner>/<repo>/<branch>/assets/...`
for files committed to `assets/`) — Puppeteer's `page.setContent()` has no base URL, so
relative/local paths won't resolve, and `raw.githubusercontent.com` 404s for anything
in a private repo.

## CI / pre-commit

`.github/workflows/node.js.yml` runs four independent jobs on push/PR to `main`
(Node 25.x): `audit` (`npm audit`), `format` (`pretty:check`), `validate`
(`validate:all` — see the caveat above about it matching no files), `typecheck`
(`tsc --noEmit`).

Husky + lint-staged run on commit (`.lintstagedrc.json`): staged `*.json` triggers
`validate:all`; staged `*.{js,ts}` triggers `pretty:write` then a `typecheck` run. The
`typecheck` step is wrapped as `bash -c 'npm run typecheck'` specifically so
lint-staged's appended list of staged filenames isn't forwarded to `tsc` — passing
explicit file arguments alongside a `tsconfig.json` is a hard error in the TypeScript
version this project uses.
