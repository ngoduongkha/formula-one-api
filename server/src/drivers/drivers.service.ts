import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { GetDriverQueryDto } from './dto/get-driver-query.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  findAll(query: GetDriverQueryDto) {
    const { year, name, nationality, team } = query;
    return this.driversRepository.find({
      where: {
        year,
        name,
        nationality,
        team,
      },
    });
  }
}
