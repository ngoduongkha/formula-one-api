import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTeamQueryDto } from './dto/get-team-query.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll(@Query() query: GetTeamQueryDto) {
    return this.teamsService.findAll(query);
  }
}
