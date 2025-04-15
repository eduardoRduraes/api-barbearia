import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {AppointmentsModule} from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AppointmentsModule, AuthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
