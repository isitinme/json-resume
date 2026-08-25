/**
 * `resumed`'s package.json "exports" field is a bare string with no "types"
 * condition, so TypeScript can't resolve its shipped .d.ts files even though
 * they exist. Mirrors resumed/dist/index.d.ts + render.d.ts + validate.d.ts.
 */
declare module "resumed" {
  type Theme<T> = {
    render: (resume: object) => T | Promise<T>
  }

  export const render: (
    resume: object,
    theme: Theme<string>
  ) => string | Promise<string>

  export const validate: (filename: string) => Promise<{ valid: boolean }>
}
