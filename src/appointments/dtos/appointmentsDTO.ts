import {IsDate, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class AppointmentsDTO{

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    clientId: string;

    @Type(() => Date)
    @IsDate()
    date: Date;

}