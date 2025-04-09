import {Body, Controller, Post, Res} from '@nestjs/common';
import {CreateUserDTO} from "./dtos/createUserDTO";
import {UsersService} from "./users.service";
import{Response} from "express";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post("create")
    async create(@Body() data:CreateUserDTO, @Res() res: Response){
        const user = await this.userService.create(data);
        return res.status(200).json(user);
    }
}
