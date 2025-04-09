import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {UsersService} from "../users/users.service";
import {ClientsService} from "../clients/clients.service";

@Injectable()
export class AppointmentsService {
    constructor(private readonly prismaService: PrismaService, private userService: UsersService, clientService:ClientsService) { }

    
}
