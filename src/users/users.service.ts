import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateUserDTO} from "./dtos/createUserDTO";
import {AppointmentsService} from "../appointments/appointments.service";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService:PrismaService) {}

    async create(data:CreateUserDTO){
        await this.checkEmailExists(data.email);

        const {password, ...safeClient} = await this.prismaService.user.create({data});

        return safeClient;
    }

    private async checkEmailExists(email:string){
        const userEmailExists = await this.prismaService.user.findUnique({where:{email}});

        if(userEmailExists) throw new ConflictException("Já existe um usuário com esse E-mail!");
    }

}
