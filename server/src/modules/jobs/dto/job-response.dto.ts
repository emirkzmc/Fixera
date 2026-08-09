export class JobResponseDto {
  id!: string;
  workshopId!: string;
  customerId?: string;
  customerName?: string;
  itemIdentifier!: string;
  issueDescription?: string;
  status!: string;
  price!: number;
  trackingCode!: string;
  estimatedDeliveryDate?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
