import { MeResponseDto } from '../dto/me-response.dto';
import { UpdateUserProfilePhotoDto } from '../dto/update-user-profile-photo.dto';

export interface IUserService {
  findByEmail(email: string): Promise<any>;
  findById(userId: string): Promise<any>;
  createUserWithWorkshop(
    fullName: string,
    email: string,
    passwordHash: string,
    workshopName: string,
  ): Promise<any>;
  getMe(userId: string, tenantId: string): Promise<MeResponseDto>;
  updateProfilePhoto(
    userId: string,
    tenantId: string,
    dto: UpdateUserProfilePhotoDto,
  ): Promise<MeResponseDto>;
}
