import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateUserDTO} from "./dtos/createUserDTO";
import {AppointmentsService} from "../appointments/appointments.service";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService:PrismaService, private readonly appointment:AppointmentsService) {}

    async create(data:CreateUserDTO){
        const userEmailExists = await this.prismaService.user.findUnique({where:{email: data.email}});

        if(userEmailExists) throw new NotFoundException({message:"já existe um usuário com este e-mail!"});

        const {password, ...safeClient} = await this.prismaService.user.create({data});

        return safeClient;
    }

}
