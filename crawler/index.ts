import axios from "axios";
import cheerio from "cheerio";

export class FormulaOneScraper {
  async scrapeResult(url: string) {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const table = $("table");

    console.log(table.html());
  }
}

async function main() {
  const scraper = new FormulaOneScraper();
  await scraper.scrapeResult(
    "https://www.formula1.com/en/results.html/2023/races/1141/bahrain/race-result.html"
  );
}

main();
