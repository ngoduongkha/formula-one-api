import { ApiProperty } from '@nestjs/swagger';

export class GetRaceQueryDto {
  @ApiProperty({ required: false })
  year?: number;

  @ApiProperty({ required: false })
  grandPrix?: string;
}
