import type { AuthenticatedUser } from '../../../common/auth/interfaces/authenticated-user.interface';
import { CreateInventoryItemDto } from '../dto/create-inventory-item.dto';
import { InventoryItemResponseDto } from '../dto/inventory-item-response.dto';
import { UpdateInventoryItemDto } from '../dto/update-inventory-item.dto';
import { UsePartDto } from '../dto/use-part.dto';

export interface IInventoryService {
  addItem(user: AuthenticatedUser, dto: CreateInventoryItemDto): Promise<InventoryItemResponseDto>;
  getItems(user: AuthenticatedUser): Promise<InventoryItemResponseDto[]>;
  updateItem(user: AuthenticatedUser, itemId: string, dto: UpdateInventoryItemDto): Promise<InventoryItemResponseDto>;
  usePartForJob(user: AuthenticatedUser, jobId: string, dto: UsePartDto): Promise<void>;
}
