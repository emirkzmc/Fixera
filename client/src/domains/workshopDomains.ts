export interface Workshop {
  id: string;
  name: string;
  themeColor: string;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  createdAt: string;
}

export interface UpdateWorkshopRequest {
  name?: string;
  themeColor?: string;
  smsEnabled?: boolean;
  whatsappEnabled?: boolean;
}
