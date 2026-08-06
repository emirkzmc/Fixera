import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CurrentUser } from '../../common/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/auth/interfaces/authenticated-user.interface';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // Müşterilerin takip kodu ile durum sorgulaması için açık uç nokta
  @Get('track/:trackingCode')
  async trackJob(@Param('trackingCode') trackingCode: string) {
    return this.jobService.getPublicJobByTrackingCode(trackingCode);
  }

  // Sadece atölye sahibinin erişebileceği uç noktalar
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createJob(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateJobDto,
  ) {
    return this.jobService.createJob(user, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyJobs(@CurrentUser() user: AuthenticatedUser) {
    return this.jobService.getJobsByWorkshop(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getJobById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.jobService.getJobById(user, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateJob(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobService.updateJob(user, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteJob(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.jobService.deleteJob(user, id);
  }
}
