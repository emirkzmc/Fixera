export interface INotificationsService {
  sendSms(phoneNumber: string, message: string): Promise<boolean>;
  sendWhatsApp(phoneNumber: string, message: string): Promise<boolean>;
}
