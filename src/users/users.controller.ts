import {Body, Controller, Get, HttpException, HttpStatus, Post, Param, UseGuards} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/createUserDTO";
import {UsersService} from "./users.service";
import {LoginDTO} from "../auth/dtos/loginDTO";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}


    @Post("login")
    async login(@Body() data: LoginDTO){
        try {
            const token = await this.authService.login(data);
            return {statusCode: HttpStatus.ACCEPTED, message:"Usuário autenticado!", data: token};
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: error.message || "Error interno!"}, HttpStatus.BAD_REQUEST);
        }
    }

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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
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
