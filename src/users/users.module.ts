import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaService} from "../../prisma/prisma.service";
import {AppointmentsService} from "../appointments/appointments.service";
import {AuthModule} from "../auth/auth.module";
import {BcryptHelper} from "../helper/bcrypt-helper";

@Module({
  imports:[AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AppointmentsService, BcryptHelper],
  exports:[UsersService]
})
export class UsersModule {}
