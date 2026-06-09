import { glob } from "glob"
import { validate } from "resumed"

;(async () => {
  try {
    const files = await glob(`${import.meta.dirname}/*.json`)
    for (const file of files) {
      await validate(file)
    }
  } catch (err) {
    console.error(`JSON schema validation failure: `, err)
    process.exit(1)
  }
})()
