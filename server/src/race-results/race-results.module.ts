import { Module } from '@nestjs/common';
import { RaceResultsService } from './race-results.service';
import { RaceResultsController } from './race-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceResult } from './entities/race-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaceResult])],
  controllers: [RaceResultsController],
  providers: [RaceResultsService],
})
export class RaceResultsModule {}
