import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'emir@example.com' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz' })
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  @MaxLength(50)
  password!: string;

  @ApiProperty({ example: 'Emir Yusuf' })
  @IsString()
  @IsNotEmpty({ message: 'Ad soyad boş bırakılamaz' })
  fullName!: string;

  @ApiProperty({ example: 'Emir Oto Tamir' })
  @IsString()
  @IsNotEmpty({ message: 'Workshop adı boş bırakılamaz' })
  workshopName!: string;
}
