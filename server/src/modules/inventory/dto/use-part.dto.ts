import { IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsePartDto {
  @ApiProperty({ example: 'uuid-string' })
  @IsUUID()
  inventoryId!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  quantity!: number;
}
