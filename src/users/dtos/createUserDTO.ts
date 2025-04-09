import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(8)
    password: string;
}