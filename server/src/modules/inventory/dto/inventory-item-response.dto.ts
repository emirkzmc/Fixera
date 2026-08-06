import { ApiProperty } from '@nestjs/swagger';

export class InventoryItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  workshopId!: string;

  @ApiProperty()
  itemName!: string;

  @ApiProperty()
  stockQuantity!: number;

  @ApiProperty()
  criticalLevel!: number;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  createdAt!: Date;
}
