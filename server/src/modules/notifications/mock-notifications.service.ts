import { Injectable } from '@nestjs/common';
import { INotificationsService } from './interfaces/notifications.service.interface';

@Injectable()
export class MockNotificationsService implements INotificationsService {
  async sendSms(phoneNumber: string, message: string): Promise<boolean> {
    console.log(`[MOCK SMS to ${phoneNumber}]: ${message}`);
    // Gerçek dünyada burada Twilio veya benzeri bir servise istek atılacak
    return true;
  }

  async sendWhatsApp(phoneNumber: string, message: string): Promise<boolean> {
    console.log(`[MOCK WhatsApp to ${phoneNumber}]: ${message}`);
    // Gerçek dünyada burada WhatsApp Cloud API / Twilio kullanılacak
    return true;
  }
}
