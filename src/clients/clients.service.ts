import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateClientDTO, ResponseClient} from "./dtos/createClientDTO";
import {PrismaService} from "../../prisma/prisma.service";
import {Client} from "@prisma/client";

@Injectable()
export class ClientsService {

    constructor(private readonly prismaService: PrismaService) {
    }
    async create(data: CreateClientDTO){
        const phoneUserExists = await this.prismaService.client.findUnique({where:{phone: data.phone}});
        const emailUserExists = await this.prismaService.client.findUnique({where:{email: data.email}});

        if(phoneUserExists) throw new NotFoundException({message: "Jâ existe um cliente com esse telefone!"});

        if(emailUserExists) throw new NotFoundException({message: "Jâ existe um cliente com esse E-mail!"});

        const {password, ...safeClient} = await this.prismaService.client.create({data: data});

        return safeClient;
    }

    async findClientPhone(phone:string){
        const phoneUserExists = await this.prismaService.client.findUnique({where:{phone}});

        if(!phoneUserExists) throw new NotFoundException({message:"Telefone não encontrado!"});

        const {password, ...safeClient} = phoneUserExists;
        return safeClient;
    }

    async allClient(){
        const allClient = await this.prismaService.client.findMany();
        let clients:Omit<Client, "password">[] | null= [];
        allClient.map(c => {
            const {password, ...safeClient} = c;
            clients.push(safeClient);
        });
        return clients;
    }

}
