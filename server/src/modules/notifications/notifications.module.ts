import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST') || 'smtp.gmail.com',
          port: config.get('MAIL_PORT') || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.get('MAIL_USER') || 'your-email@gmail.com',
            pass: config.get('MAIL_PASSWORD') || 'your-app-password',
          },
        },
        defaults: {
          from: `"Fixera Bildirim" <${config.get('MAIL_USER') || 'noreply@fixera.com'}>`,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: 'INotificationsService',
      useClass: NotificationsService,
    },
  ],
  exports: ['INotificationsService'],
})
export class NotificationsModule {}
