import { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobResponseDto } from '../dto/job-response.dto';

export interface IJobService {
  createJob(user: AuthenticatedUser, dto: CreateJobDto): Promise<JobResponseDto>;
  getJobsByWorkshop(user: AuthenticatedUser): Promise<JobResponseDto[]>;
  getJobById(user: AuthenticatedUser, jobId: string): Promise<JobResponseDto>;
  updateJob(user: AuthenticatedUser, jobId: string, dto: UpdateJobDto): Promise<JobResponseDto>;
  deleteJob(user: AuthenticatedUser, jobId: string): Promise<void>;
  getPublicJobByTrackingCode(trackingCode: string): Promise<JobResponseDto>;
}
