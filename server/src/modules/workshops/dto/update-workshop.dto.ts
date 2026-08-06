import { IsString, IsOptional, Length, Matches } from 'class-validator';

export class UpdateWorkshopDto {
  @IsOptional()
  @IsString()
  @Length(2, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { message: 'Geçerli bir HEX renk kodu giriniz' })
  themeColor?: string;
}
