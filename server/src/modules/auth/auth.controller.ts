import { Controller, Post, Body, Get, Put, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kullanıcının profil fotoğrafını yükle' })
  @UseGuards(JwtAuthGuard)
  @Post('upload-profile-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads/profiles',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return callback(new BadRequestException('Sadece resim dosyalarına izin verilmektedir'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  }))
  async uploadProfilePhoto(
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Dosya yüklenemedi');
    }
    
    // Yüklenen dosyanın public URL'sini oluştur
    const photoUrl = `/uploads/profiles/${file.filename}`;
    
    // Veritabanını güncelle
    const dto = new UpdateUserProfilePhotoDto();
    dto.profilePhoto = photoUrl;
    
    return this.authService.updateProfilePhoto(user, dto);
  }
}
