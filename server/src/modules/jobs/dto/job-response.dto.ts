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
  createdAt!: Date;
  updatedAt!: Date;
}
