import { Controller, Post, Body, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';
import { UpdateUserProfilePhotoDto } from '../users/dto/update-user-profile-photo.dto';
import { JwtAuthGuard } from '../../common/auth/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Yeni kullanıcı kaydı (Workshop ile birlikte)' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Giriş yapan kullanıcının profil bilgilerini getir' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.getMe(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcının profil fotoğrafını güncelle' })
  @UseGuards(JwtAuthGuard)
  @Put('profile-photo')
  async updateProfilePhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateUserProfilePhotoDto,
  ) {
    return this.authService.updateProfilePhoto(user, dto);
  }
}
