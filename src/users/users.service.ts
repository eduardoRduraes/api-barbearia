import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreateUserDTO} from "./dtos/createUserDTO";

import {Users} from "@prisma/client";
import {BcryptHelper} from "../helper/bcrypt-helper";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(data: CreateUserDTO){
        await this.checkDuplicateFields(data);
        const hashPassword = await BcryptHelper.hashPassword(data.password);

       data.password = hashPassword;

        const user = await this.prismaService.users.create({data});
        return this.omitPassword(user);
    }

    async findClientPhone(phone:string){
        const phoneUserExists = await this.prismaService.users.findUnique({where:{phone, status: "USER"}});

        if(!phoneUserExists) throw new NotFoundException({message:"Número de cliente não encontrado!"});

        const {password, ...safeClient} = phoneUserExists;
        return safeClient;
    }

    async allClient(){
        const allClient = await this.prismaService.users.findMany();
        return allClient.length > 0 ?
            allClient.map(c => {
                if(c.status == "USER") return this.omitPassword(c);
            })
            : [];
    }

    private async findId(id:string){
       const admin = await this.prismaService.users.findUnique({where: {id}});
       return admin;
    }

    private async checkDuplicateFields(data: CreateUserDTO){
        const {phone, email} = data;

        const [phoneUserExists,emailUserExists] = await Promise.all([
            await this.prismaService.users.findUnique({where:{phone}}),
            await this.prismaService.users.findUnique({where:{email}})
        ]);

        if(phoneUserExists) throw new ConflictException({message: "Já existe um cadastro com esse telefone!"});

        if(emailUserExists) throw new ConflictException({message: "Já existe um cadastro com esse E-mail!"});
    }

    private omitPassword(client): Omit<Users, "password"> {
        const {password, ...safeClient} = client;
        return safeClient;
    }

}
