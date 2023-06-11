import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetResultQueryDto {
  @ApiProperty({ required: false })
  @IsInt()
  year?: number;

  @ApiProperty({ required: false })
  @IsString()
  grandPrix?: string;
}
