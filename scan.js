const puppeteer = require("puppeteer");
const AxePuppeteer = require("@axe-core/puppeteer").default;

async function scanWebsite(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const results = await new AxePuppeteer(page).analyze();
  await browser.close();

  return results;
}

module.exports = scanWebsite;
