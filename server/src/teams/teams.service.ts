import { Injectable } from '@nestjs/common';
import { GetTeamQueryDto } from './dto/get-team-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  findAll(query: GetTeamQueryDto) {
    const { year } = query;
    return this.teamRepository.find({
      where: {
        year,
      },
    });
  }
}
