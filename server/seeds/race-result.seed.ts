import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as Results from '../../crawler/data/results.json';
import { DataSource } from 'typeorm';
import { RaceResult } from 'src/race-results/entities/race-result.entity';

export default class RaceResultSeeder implements Seeder {
  run(dataSource: DataSource): Promise<any> {
    const raceResultRepository = dataSource.getRepository(RaceResult);

    const data = Results.map((r) => {
      const newRaceResult = new RaceResult();
      newRaceResult.position = r['Pos'];
      newRaceResult.year = parseInt(r['Year']);
      newRaceResult.no = r['No'];
      newRaceResult.driver = r['Driver'];
      newRaceResult.car = r['Car'];
      newRaceResult.laps = r['Laps'];
      newRaceResult.time = r['Time/Retired'];
      newRaceResult.points = r['PTS'];
      newRaceResult.grandPrix = r['Grand Prix'] ?? '';
      return newRaceResult;
    });

    return raceResultRepository.save(data);
  }
}
