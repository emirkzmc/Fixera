import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class UpdateUserProfilePhotoDto {
  @IsString()
  @IsNotEmpty({ message: 'Profil fotoğrafı bağlantısı boş olamaz' })
  @IsUrl({}, { message: 'Geçerli bir URL giriniz' })
  profilePhoto!: string;
}
