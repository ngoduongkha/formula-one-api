import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as TeamData from '../../crawler/data/teams.json';
import { DataSource } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

export default class TeamSeeder implements Seeder {
  run(dataSource: DataSource): Promise<any> {
    const teamRepository = dataSource.getRepository(Team);

    const data = TeamData.map((team) => {
      const newTeam = new Team();
      newTeam.position = parseInt(team['Pos']);
      newTeam.year = parseInt(team['Year']);
      newTeam.name = team['Team'];
      newTeam.points = parseInt(team['PTS']);
      return newTeam;
    });

    return teamRepository.save(data);
  }
}
