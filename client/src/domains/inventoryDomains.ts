export interface InventoryItem {
  id: string;
  workshopId: string;
  itemName: string;
  stockQuantity: number;
  criticalLevel: number;
  price: number;
  createdAt: string;
}

export interface CreateInventoryItemRequest {
  itemName: string;
  stockQuantity?: number;
  criticalLevel?: number;
  price?: number;
}

export interface UpdateInventoryItemRequest extends Partial<CreateInventoryItemRequest> {}

export interface UseInventoryRequest {
  itemId: string;
  quantityUsed: number;
}
