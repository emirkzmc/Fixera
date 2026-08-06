import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MeResponseDto } from './dto/me-response.dto';
import { UpdateUserProfilePhotoDto } from './dto/update-user-profile-photo.dto';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string) {
    const result = await this.databaseService.query(
      'SELECT id, email, full_name, password_hash, workshop_id, profile_photo FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] || null;
  }

  async findById(userId: string) {
    const result = await this.databaseService.query(
      'SELECT id, email, full_name, password_hash, workshop_id, profile_photo FROM users WHERE id = $1',
      [userId],
    );
    return result.rows[0] || null;
  }

  async createUserWithWorkshop(
    fullName: string,
    email: string,
    passwordHash: string,
    workshopName: string,
  ) {
    const client = await this.databaseService.getClient();
    try {
      await client.query('BEGIN');

      const workshopResult = await client.query(
        'INSERT INTO workshops (name) VALUES ($1) RETURNING id, name',
        [workshopName],
      );
      const workshop = workshopResult.rows[0];

      const userResult = await client.query(
        'INSERT INTO users (workshop_id, full_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, workshop_id',
        [workshop.id, fullName, email, passwordHash],
      );
      const user = userResult.rows[0];

      await client.query('COMMIT');
      return user;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async getMe(userId: string, tenantId: string): Promise<MeResponseDto> {
    const user = await this.findById(userId);
    if (!user || user.workshop_id !== tenantId) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      workshopId: user.workshop_id,
      profilePhoto: user.profile_photo,
    };
  }

  async updateProfilePhoto(
    userId: string,
    tenantId: string,
    dto: UpdateUserProfilePhotoDto,
  ): Promise<MeResponseDto> {
    const user = await this.findById(userId);
    if (!user || user.workshop_id !== tenantId) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    const result = await this.databaseService.query(
      'UPDATE users SET profile_photo = $1 WHERE id = $2 RETURNING id, full_name, email, workshop_id, profile_photo',
      [dto.profilePhoto, userId],
    );

    const updatedUser = result.rows[0];
    return {
      id: updatedUser.id,
      fullName: updatedUser.full_name,
      email: updatedUser.email,
      workshopId: updatedUser.workshop_id,
      profilePhoto: updatedUser.profile_photo,
    };
  }
}
