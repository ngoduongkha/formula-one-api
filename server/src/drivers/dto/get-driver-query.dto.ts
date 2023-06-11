import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetDriverQueryDto {
  @ApiProperty({ required: false })
  @IsInt()
  year?: number;

  @ApiProperty({ required: false })
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  nationality?: string;

  @ApiProperty({ required: false })
  @IsString()
  team?: string;
}
