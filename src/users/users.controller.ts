import {Body, Controller, Get, HttpException, HttpStatus, Post, Param} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/createUserDTO";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post("create")
    async create(@Body() data:CreateUserDTO){
        try {
            const user = await this.userService.create(data);
            const message = user.status =="USER"?  "Cliente criado com sucesso!" :  "Admin criado com sucesso!";

            return {statusCode: HttpStatus.CREATED, message, data: user};
        }catch (error){
            throw new HttpException(
                {statusCode: HttpStatus.BAD_REQUEST, message: error.message || 'Erro ao criar'},
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get("all")
    async allUsers(){
        try {
            const users = await this.userService.allClient();
            const message:string = users.length > 0 ? "Cliente encontrados" : "Não existe clientes cadastrados!";

            return {statusCode: HttpStatus.OK, message, data: users}
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: error.message || "Error interno"}, HttpStatus.BAD_REQUEST);
        }
    }

    @Get("find/:phone")
    async findClientPhone(@Param("phone") phone:string){
        try {
            const user = await this.userService.findClientPhone(phone);
            const message = user != null ? "Cliente encontrado!" : "Numero de telefone não está cadastrado!";

            return {statusCode: HttpStatus.OK, message, data: user};
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: error.message || "Error interno"}, HttpStatus.BAD_REQUEST);
        }
    }
}
