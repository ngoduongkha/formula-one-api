import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiTags } from '@nestjs/swagger';
import { GetDriverQueryDto } from './dto/get-driver-query.dto';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  findAll(@Query() query: GetDriverQueryDto) {
    return this.driversService.findAll(query);
  }
}
