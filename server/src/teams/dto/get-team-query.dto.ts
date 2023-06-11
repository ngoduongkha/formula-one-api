import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetTeamQueryDto {
  @ApiProperty({ required: false })
  @IsInt()
  year?: number;
}
