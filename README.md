# json-resume

My resumes in [JSON Resume](https://jsonresume.org/) format. Each variant is a plain
`resume.json`-shaped file rendered to PDF by [`resumed`](https://github.com/rbardini/resumed)
and [Puppeteer](https://pptr.dev/), using [`jsonresume-theme-even`](https://github.com/rbardini/jsonresume-theme-even)
by default.

## Requirements

- Node.js `>=25` (see `.nvmrc`). Scripts are plain `.ts` files run directly by Node's
  built-in TypeScript support — no build step, no `ts-node`/`tsx`.
- `npm install` to pull in dependencies.

## Usage

Render a schema to PDF with `FILE_NAME` set to a filename (without `.json`) under
`src/schemas/`:

```
FILE_NAME=resume npm start

open dist/resume.pdf
```

The output PDF is written to `dist/<FILE_NAME>.pdf`.

## Schemas

Each file under `src/schemas/` is a self-contained resume variant, e.g. tailored to a
specific role or written for a different person. Naming follows `<name>-<variant>.json`
(e.g. `alina-content-creator.json`); a `_ua` suffix marks a Ukrainian translation of
another schema (e.g. `alina-content-creator_ua.json`).

## Themes

Rendering uses the `jsonresume-theme-even` theme by default. To use a different installed
`jsonresume-theme-*` package, pass its short name via `THEME`:

```
FILE_NAME=resume THEME=elegant-pink npm start
```

## Scripts

- `npm start` — render `$FILE_NAME` to `dist/$FILE_NAME.pdf`.
- `npm run validate:all` — validate schema files against the JSON Resume schema.
- `npm run typecheck` — type-check the TypeScript sources with `tsc --noEmit`.
- `npm run pretty:check` / `npm run pretty:write` — check/apply Prettier formatting.

A pre-commit hook (Husky + lint-staged) runs validation, formatting, and type-checking
on staged files. CI runs the same checks, plus `npm audit`, on every push and PR to `main`.

## Environment variables

Defaults for `FILE_NAME` and `THEME` can be set in a local `.env` file so `npm start`
works without inline env vars.
