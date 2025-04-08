import {IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength} from "class-validator";


export class CreateClientDTO{
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;

    @IsPhoneNumber('BR', {message:'Número de telefone inválido!'})
    phone: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(8)
    password: string;
}