import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {ClientsService} from "./clients.service";
import {CreateClientDTO} from "./dtos/createClientDTO";
import {Response, response} from "express";

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientService: ClientsService) {}

    @Post()
    async create(@Body() data: CreateClientDTO, @Res() res: Response){
        const client = await this.clientService.create(data);
        return res.status(201).json(client);
    }
    
    @Get("find/:phone")
    async find(@Param('phone') phone: string, @Res() res: Response){
        const user = await this.clientService.findClientPhone(phone);
        return res.status(200).json(user);
    }

    @Get("all")
    async all(@Res() res: Response){
        const allClients = await this.clientService.allClient();
        return res.status(200).json(allClients);
    }

}
