import { WorkshopResponseDto } from '../dto/workshop-response.dto';
import { UpdateWorkshopDto } from '../dto/update-workshop.dto';
import { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';

export interface IWorkshopService {
  getWorkshopById(id: string): Promise<WorkshopResponseDto>;
  getMyWorkshop(user: AuthenticatedUser): Promise<WorkshopResponseDto>;
  updateMyWorkshop(user: AuthenticatedUser, dto: UpdateWorkshopDto): Promise<WorkshopResponseDto>;
}
