import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaService} from "../../prisma/prisma.service";
import {AppointmentsService} from "../appointments/appointments.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AppointmentsService]
})
export class UsersModule {}
