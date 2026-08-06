import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { WorkshopModule } from './modules/workshops/workshop.module';
import { JobModule } from './modules/jobs/job.module';
import { EventsModule } from './modules/events/events.module';
import { CustomersModule } from './modules/customers/customer.module';
import { FinancesModule } from './modules/finances/finances.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WorkshopModule,
    JobModule,
    EventsModule,
    CustomersModule,
    FinancesModule,
    InventoryModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
