import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RacesService } from './races.service';
import { ApiTags } from '@nestjs/swagger';
import { GetRaceQueryDto } from './dto/get-race-query.dto';

@ApiTags('races')
@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Get()
  findAll(@Query() query: GetRaceQueryDto) {
    return this.racesService.findAll(query);
  }
}
