import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { TypeOrmConfigService } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacesModule } from './races/races.module';
import { TeamsModule } from './teams/teams.module';
import { RaceResultsModule } from './race-results/race-results.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    DriversModule,
    RacesModule,
    TeamsModule,
    RaceResultsModule,
  ],
})
export class MainModule {}
