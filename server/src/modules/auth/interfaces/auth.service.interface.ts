import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthResponse } from './auth-response.interface';
import { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';
import { MeResponseDto } from '../../users/dto/me-response.dto';
import { UpdateUserProfilePhotoDto } from '../../users/dto/update-user-profile-photo.dto';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<AuthResponse>;
  login(loginDto: LoginDto): Promise<AuthResponse>;
  getMe(authUser: AuthenticatedUser): Promise<MeResponseDto>;
  updateProfilePhoto(authUser: AuthenticatedUser, dto: UpdateUserProfilePhotoDto): Promise<MeResponseDto>;
}
