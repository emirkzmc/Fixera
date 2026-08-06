import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id!: string;

  @ApiProperty({ example: 'uuid-string' })
  workshopId!: string;

  @ApiProperty({ example: 'Ahmet Yılmaz' })
  fullName!: string;

  @ApiProperty({ example: '05554443322', required: false })
  phone?: string;

  @ApiProperty()
  createdAt!: Date;
}
