import axios from 'axios';
import cheerio from 'cheerio';
import * as fs from 'fs';

export class TableData {
  readonly headers: string[];
  readonly rows: string[][];

  constructor(headers: string[], rows: string[][]) {
    this.headers = headers;
    this.rows = rows;
  }
}

export class FormulaOneScraper {
  async scrapeRace(year: number): Promise<TableData> {
    const html = await axios
      .get(`https://www.formula1.com/en/results.html/${year}/races.html`)
      .then((res) => res.data);
    const $ = cheerio.load(html);
    const table = $('table.resultsarchive-table').first();

    const headers = table
      .find('thead tr th')
      .toArray()
      .map((el) => $(el).text().trim())
      .filter((v) => v !== '');
    const rows = table
      .find('tbody tr')
      .toArray()
      .map((el) => {
        const row = $(el);
        const cells = row
          .find('td')
          .toArray()
          .map((el) => $(el).text().trim().replace(/\s+/g, ' '))
          .filter((v) => v !== '');
        return cells;
      });

    return new TableData(headers, rows);
  }

  async scrapeDriver(year: number): Promise<TableData> {
    const html = await axios
      .get(`https://www.formula1.com/en/results.html/${year}/drivers.html`)
      .then((res) => res.data);
    const $ = cheerio.load(html);
    const table = $('table.resultsarchive-table').first();

    const headers = table
      .find('thead tr th')
      .toArray()
      .map((el) => $(el).text().trim())
      .filter((v) => v !== '');
    const rows = table
      .find('tbody tr')
      .toArray()
      .map((el) => {
        const row = $(el);
        const cells = row
          .find('td')
          .toArray()
          .map((el) => $(el).text().trim().replace(/\s+/g, ' '))
          .filter((v) => v !== '');
        return cells;
      });

    return new TableData(headers, rows);
  }

  async scrapeTeam(year: number): Promise<TableData> {
    const html = await axios
      .get(`https://www.formula1.com/en/results.html/${year}/team.html`)
      .then((res) => res.data);
    const $ = cheerio.load(html);
    const table = $('table.resultsarchive-table').first();

    const headers = table
      .find('thead tr th')
      .toArray()
      .map((el) => $(el).text().trim())
      .filter((v) => v !== '');
    const rows = table
      .find('tbody tr')
      .toArray()
      .map((el) => {
        const row = $(el);
        const cells = row
          .find('td')
          .toArray()
          .map((el) => $(el).text().trim().replace(/\s+/g, ' '))
          .filter((v) => v !== '');
        return cells;
      });

    return new TableData(headers, rows);
  }

  async scapeResults(year: number): Promise<TableData> {
    const html = await axios
      .get(`https://www.formula1.com/en/results.html/${year}/races.html`)
      .then((res) => res.data);
    const $ = cheerio.load(html);
    const table = $('table.resultsarchive-table').first();
    const col = table.find('tbody tr td:nth-child(2)').toArray();
    const races = col.map((el) => {
      const link = $(el).find('a').attr('href') ?? '';
      const name = $(el).find('a').text().trim();
      return {
        link,
        name,
      };
    });

    const rowsRes: string[][] = [];
    const headersRes: string[] = [];

    for (let i = 0; i < races.length; i += 1) {
      const html = await axios
        .get(`https://www.formula1.com${races[i].link}`)
        .then((res) => res.data);
      const $ = cheerio.load(html);
      const table = $('table.resultsarchive-table').first();

      if (i === 0) {
        const headers = table
          .find('thead tr th')
          .toArray()
          .map((el) => $(el).text().trim())
          .filter((v) => v !== '');
        headersRes.push(...headers, 'Grand Prix');
      }

      const rows = table
        .find('tbody tr')
        .toArray()
        .map((el) => {
          const row = $(el);
          const cells = row
            .find('td')
            .toArray()
            .map((el) => $(el).text().trim().replace(/\s+/g, ' '))
            .filter((v) => v !== '');
          return [...cells, races[i].name];
        });
      rowsRes.push(...rows);
    }

    return new TableData(headersRes, rowsRes);
  }
}

export class FileExporter {
  private readonly dir: string = './data';

  async exportJson(data: any, fileName: string): Promise<void> {
    if (!fs.existsSync(this.dir)) {
      await fs.mkdir(this.dir, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    await fs.writeFile(
      `${this.dir}/${fileName}.json`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  }

  async deleteDir(): Promise<void> {
    if (!fs.existsSync(this.dir)) {
      return;
    }

    await fs.rm(this.dir, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

export class App {
  // const Years from 1950 to 2022
  private readonly YEARS: number[] = Array.from(
    Array(2022 - 2010 + 1),
    (_, i) => i + 2000,
  );

  private readonly scraper: FormulaOneScraper;
  private readonly exporter: FileExporter;

  constructor() {
    this.scraper = new FormulaOneScraper();
    this.exporter = new FileExporter();
  }

  async run(): Promise<void> {
    // delete old data
    await this.exporter.deleteDir();

    await this.driverData();
    await this.teamData();
    await this.raceData();
    await this.resultsData();
  }

  async driverData() {
    const finalData = [];

    for (const year of this.YEARS) {
      const drivers = await this.scraper.scrapeDriver(year);
      // generate object with key is header and value is row
      const data = drivers.rows.map((row) => {
        const obj: { [key: string]: string } = {};
        for (let i = 0; i < drivers.headers.length; i += 1) {
          obj[drivers.headers[i]] = row[i];
          obj['Year'] = year.toString();
        }
        return obj;
      });
      finalData.push(...data);
    }

    await this.exporter.exportJson(finalData, 'drivers');
  }

  async teamData() {
    const finalData = [];

    for (const year of this.YEARS) {
      const drivers = await this.scraper.scrapeTeam(year);
      // generate object with key is header and value is row
      const data = drivers.rows.map((row) => {
        const obj: { [key: string]: string } = {};
        for (let i = 0; i < drivers.headers.length; i += 1) {
          obj[drivers.headers[i]] = row[i];
          obj['Year'] = year.toString();
        }
        return obj;
      });
      finalData.push(...data);
    }

    await this.exporter.exportJson(finalData, 'teams');
  }

  async raceData() {
    const finalData = [];

    for (const year of this.YEARS) {
      const drivers = await this.scraper.scrapeRace(year);
      // generate object with key is header and value is row
      const data = drivers.rows.map((row) => {
        const obj: { [key: string]: string } = {};
        for (let i = 0; i < drivers.headers.length; i += 1) {
          obj[drivers.headers[i]] = row[i];
          obj['Year'] = year.toString();
        }
        return obj;
      });
      finalData.push(...data);
    }

    await this.exporter.exportJson(finalData, 'races');
  }

  async resultsData() {
    const finalData = [];

    for (const year of this.YEARS) {
      console.log('Still exporting data...');
      const drivers = await this.scraper.scapeResults(year);
      // generate object with key is header and value is row
      const data = drivers.rows.map((row) => {
        const obj: { [key: string]: string } = {};
        for (let i = 0; i < drivers.headers.length; i += 1) {
          obj[drivers.headers[i]] = row[i];
          obj['Year'] = year.toString();
        }
        return obj;
      });
      finalData.push(...data);
    }

    await this.exporter.exportJson(finalData, 'results');
  }
}

((): void => {
  const app = new App();
  app.run();
})();
