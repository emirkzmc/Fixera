import { Injectable, Logger } from '@nestjs/common';
import { INotificationsService } from './interfaces/notifications.service.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService implements INotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html,
      });
      this.logger.log(`[EMAIL SENT to ${to}]: ${subject}`);
      return true;
    } catch (error) {
      this.logger.error(`[EMAIL ERROR to ${to}]: ${error}`);
      return false;
    }
  }
}
