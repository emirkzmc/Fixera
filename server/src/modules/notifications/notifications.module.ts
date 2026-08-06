import { Module, Global } from '@nestjs/common';
import { MockNotificationsService } from './mock-notifications.service';

@Global()
@Module({
  // İleride Mock yerine TwilioNotificationsService yazıldığında sadece burayı değiştirmek yetecek:
  // { provide: 'INotificationsService', useClass: TwilioNotificationsService }
  providers: [
    {
      provide: 'INotificationsService',
      useClass: MockNotificationsService,
    },
  ],
  exports: ['INotificationsService'],
})
export class NotificationsModule {}
