import { readFile } from 'node:fs/promises';
import * as theme from 'jsonresume-theme-even';
import puppeteer from 'puppeteer';
import { render } from 'resumed';

(async () => {
	const resumeFile = await readFile('resume.json', 'utf-8');
	const resumeJson = JSON.parse(resumeFile);
	const html = await render(resumeJson, theme);

	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.setContent(html, { waitUntil: 'networkidle0' });
	await page.pdf({
		path: 'resume.pdf',
		format: 'a4',
		printBackground: true,
	});
	await browser.close();
})();
