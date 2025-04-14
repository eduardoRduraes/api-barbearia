import {Module} from '@nestjs/common';
import {AppointmentsService} from './appointments.service';
import {AppointmentsController} from './appointments.controller';
import {PrismaService} from "../../prisma/prisma.service";
import {UsersService} from "../users/users.service";

@Module({
  providers: [AppointmentsService, PrismaService,UsersService],
  controllers: [AppointmentsController],
  exports:[AppointmentsService]
})
export class AppointmentsModule {}
