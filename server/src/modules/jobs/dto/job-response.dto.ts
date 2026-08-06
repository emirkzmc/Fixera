export class JobResponseDto {
  id!: string;
  workshopId!: string;
  customerName!: string;
  itemIdentifier!: string;
  issueDescription?: string;
  status!: string;
  trackingCode!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
