import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceResult } from './entities/race-result.entity';
import { Repository } from 'typeorm';
import { GetResultQueryDto } from './dto/get-result-query.dto';

@Injectable()
export class RaceResultsService {
  constructor(
    @InjectRepository(RaceResult)
    private readonly raceResultRepository: Repository<RaceResult>,
  ) {}

  findAll(query: GetResultQueryDto) {
    const { year, grandPrix } = query;
    return this.raceResultRepository.find({
      where: {
        year,
        grandPrix,
      },
    });
  }
}
