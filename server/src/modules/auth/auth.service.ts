import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IAuthService } from './interfaces/auth.service.interface';
import { JwtPayload } from '../../common/auth/interfaces/jwt-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';
import { UserService } from '../users/user.service';
import { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';
import { MeResponseDto } from '../users/dto/me-response.dto';
import { UpdateUserProfilePhotoDto } from '../users/dto/update-user-profile-photo.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, fullName, workshopName } = registerDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUserWithWorkshop(fullName, email, hashedPassword, workshopName);

    const payload: JwtPayload = { sub: user.id, email: user.email, workshopId: user.workshop_id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        workshopId: user.workshop_id,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email, workshopId: user.workshop_id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        workshopId: user.workshop_id,
      },
    };
  }

  async getMe(authUser: AuthenticatedUser): Promise<MeResponseDto> {
    const userId = this.resolveUserId(authUser);
    const tenantId = this.resolveTenantId(authUser);
    return this.userService.getMe(userId, tenantId);
  }

  async updateProfilePhoto(
    authUser: AuthenticatedUser,
    dto: UpdateUserProfilePhotoDto,
  ): Promise<MeResponseDto> {
    const userId = this.resolveUserId(authUser);
    const tenantId = this.resolveTenantId(authUser);
    return this.userService.updateProfilePhoto(userId, tenantId, dto);
  }

  private resolveUserId(authUser: AuthenticatedUser): string {
    if (!authUser.userId) {
      throw new UnauthorizedException('Kullanıcı oturumu çözümlenemedi');
    }
    return authUser.userId;
  }

  private resolveTenantId(authUser: AuthenticatedUser): string {
    if (!authUser.tenantId) {
      throw new UnauthorizedException('Tenant oturumu çözümlenemedi');
    }
    return authUser.tenantId;
  }
}
