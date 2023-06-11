import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as RacesData from '../../crawler/data/races.json';
import { DataSource } from 'typeorm';
import { Race } from 'src/races/entities/race.entity';

export default class RaceSeeder implements Seeder {
  run(dataSource: DataSource): Promise<any> {
    const racesRepository = dataSource.getRepository(Race);

    const data = RacesData.map((race) => {
      const newRace = new Race();
      newRace.grandPrix = race['Grand Prix'];
      newRace.year = parseInt(race['Year']);
      newRace.date = race['Date'];
      newRace.winner = race['Winner'];
      newRace.car = race['Car'];
      newRace.laps = race['Laps'];
      newRace.time = race['Time'] ?? '';
      return newRace;
    });

    return racesRepository.save(data);
  }
}
