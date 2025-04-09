import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {PrismaService} from "../../prisma/prisma.service";
import {UsersService} from "../users/users.service";
import {ClientsService} from "../clients/clients.service";

@Module({
  providers: [AppointmentsService, PrismaService,UsersService,
    ClientsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
