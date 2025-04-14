import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateClientDTO} from "./dtos/createClientDTO";
import {PrismaService} from "../../prisma/prisma.service";
import {Client} from "@prisma/client";

@Injectable()
export class ClientsService {

    constructor(private readonly prismaService: PrismaService) {
    }
    async create(data: CreateClientDTO){
        await this.checkDuplicateFields(data);
        const client = await this.prismaService.client.create({data});
        return this.omitPassword(client);
    }

    async findClientPhone(phone:string){
        const phoneUserExists = await this.prismaService.client.findUnique({where:{phone}});

        if(!phoneUserExists) throw new NotFoundException({message:"Telefone não encontrado!"});

        const {password, ...safeClient} = phoneUserExists;
        return safeClient;
    }

    async allClient(){
        const allClient = await this.prismaService.client.findMany();
        return allClient.length > 0 ?
            allClient.map(c => this.omitPassword(c))
            : [];
    }

    private async checkDuplicateFields(data: CreateClientDTO){
        const {phone, email} = data;

        const [phoneUserExists,emailUserExists] = await Promise.all([
            await this.prismaService.client.findUnique({where:{phone}}),
            await this.prismaService.client.findUnique({where:{email}})
        ]);

        if(phoneUserExists) throw new ConflictException({message: "Jâ existe um cliente com esse telefone!"});

        if(emailUserExists) throw new ConflictException({message: "Jâ existe um cliente com esse E-mail!"});
    }

    private omitPassword(client): Omit<Client, "password"> {
        const {password, ...safeClient} = client;
        return safeClient;
    }

}
