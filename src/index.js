import path from "node:path"
import { readFile } from "node:fs/promises"
import * as theme from "jsonresume-theme-even"
import puppeteer from "puppeteer"
import { render } from "resumed"
import "@dotenvx/dotenvx/config"

process
  .on("uncaughtException", (err) => {
    console.error("uncaughtException", err)
    process.exit(1)
  })
  .on("unhandledRejection", (err) => {
    console.error("unhandledRejection", err)
    process.exit(1)
  })

/**
 * FILE_NAME: one of the given json files in src/schemas directory
 * e.g.:
 * FILE_NAME=resume
 */
const FILE_NAME = process.env.FILE_NAME
if (!FILE_NAME) {
  throw new Error(`FILE_NAME must be set to environment. Given: ${FILE_NAME}`)
}

const sourceFileNamePath = path.join(
  import.meta.dirname,
  "schemas",
  `${FILE_NAME}.json`
)
const distDir = path.join(import.meta.dirname, "..", "dist")
const outputFileName = `${FILE_NAME}.pdf`
const outputPath = path.join(distDir, outputFileName)

;(async () => {
  let browser

  try {
    const resumeFile = await readFile(sourceFileNamePath, "utf-8")
    const resumeJson = JSON.parse(resumeFile)
    const html = await render(resumeJson, theme)

    browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setContent(html, { waitUntil: "networkidle0" })
    await page.pdf({
      path: outputPath,
      format: "a4",
      printBackground: true,
    })
  } catch (err) {
    console.error("PDF generation failure: ", err)
    process.exit(1)
  } finally {
    await browser?.close()
  }
})()
