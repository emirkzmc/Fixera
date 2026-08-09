export interface INotificationsService {
  sendEmail(to: string, subject: string, html: string): Promise<boolean>;
}
