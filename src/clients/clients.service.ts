import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateClientDTO} from "./dtos/createClientDTO";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class ClientsService {

    constructor(private readonly prismaService: PrismaService) {
    }
    async create(data: CreateClientDTO){
        const phoneUserExists = await this.prismaService.client.findUnique({where:{phone: data.phone}});
        const emailUserExists = await this.prismaService.client.findUnique({where:{email: data.email}});

        if(phoneUserExists) throw new NotFoundException({message: "Jâ existe um cliente com esse telefone!"});

        if(emailUserExists) throw new NotFoundException({message: "Jâ existe um cliente com esse E-mail!"});

        const newUser = await this.prismaService.client.create({data: data});

        return newUser;
    }

    async findClientPhone(phone:string){
        const phoneUserExists = await this.prismaService.client.findUnique({where:{phone}});

        if(!phoneUserExists) throw new NotFoundException({message:"Telefone não encontrado!"});

        // @ts-ignore
        delete phoneUserExists.password;

        return phoneUserExists;
    }



}
