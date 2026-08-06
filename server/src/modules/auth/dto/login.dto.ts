import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'emir@example.com' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz' })
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  @MaxLength(50)
  password!: string;
}
