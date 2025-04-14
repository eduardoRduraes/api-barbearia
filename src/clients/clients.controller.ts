import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {ClientsService} from "./clients.service";
import {CreateClientDTO} from "./dtos/createClientDTO";
import {Response} from "express";

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientService: ClientsService) {}

    @Post("create")
    async create(@Body() data: CreateClientDTO){
        try{
            const client = await this.clientService.create(data);
            return {StatusCode: HttpStatus.CREATED, message:"Cliente criado com sucesso!", data: client};
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: error.message || "Erro ao criar usuário"}, HttpStatus.BAD_REQUEST);
        }
    }
    
    @Get("find/:phone")
    async find(@Param('phone') phone: string){
        try {
            const user = await this.clientService.findClientPhone(phone);
            return {statusCode: HttpStatus.OK, message:"Client encontrado!", data: user};
        }catch (error){
            throw new HttpException(
                {statusCode: HttpStatus.NOT_FOUND, message: error.message || "Cliente não encontrado!"}, HttpStatus.NOT_FOUND
            );
        }
    }

    @Get("all")
    async all(){
        const allClients = await this.clientService.allClient();
        return allClients.length > 0 ? {statusCode: HttpStatus.OK, message:"Clientes encontrados!", data:allClients} :{statusCode: HttpStatus.OK, message:"Não existe cadastros de clientes!", data:allClients};
    }

}
