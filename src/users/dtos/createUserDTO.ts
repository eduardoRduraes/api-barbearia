import {IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength} from "class-validator";
import {USERSTATUS} from "@prisma/client";

export class CreateUserDTO{

    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;

    @IsPhoneNumber('BR', {message:'Número de telefone inválido!'})
    phone: string;

    @IsNotEmpty()
    status: USERSTATUS;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(8)
    password: string;
}
