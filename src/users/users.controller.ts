import {Body, Controller, HttpException, HttpStatus, Post, Res} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/createUserDTO";
import {UsersService} from "./users.service";
import{Response} from "express";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post("create")
    async create(@Body() data:CreateUserDTO){
        try {
            const user = await this.userService.create(data);
            return {statusCode: HttpStatus.CREATED, message: "Usuário criado com sucesso!", data: user};
        }catch (error){
            throw new HttpException(
                {statusCode: HttpStatus.BAD_REQUEST, message: error.message || 'Erro ao criar um usuário'},
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
