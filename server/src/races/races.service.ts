import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { Repository } from 'typeorm';
import { GetRaceQueryDto } from './dto/get-race-query.dto';

@Injectable()
export class RacesService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  findAll(query: GetRaceQueryDto) {
    const { year, grandPrix } = query;
    return this.raceRepository.find({
      where: {
        year,
        grandPrix,
      },
    });
  }
}
