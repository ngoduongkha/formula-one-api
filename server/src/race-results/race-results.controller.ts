import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RaceResultsService } from './race-results.service';
import { ApiTags } from '@nestjs/swagger';
import { GetResultQueryDto } from './dto/get-result-query.dto';

@ApiTags('race-results')
@Controller('race-results')
export class RaceResultsController {
  constructor(private readonly raceResultsService: RaceResultsService) {}

  @Get()
  findAll(@Query() query: GetResultQueryDto) {
    return this.raceResultsService.findAll(query);
  }
}
