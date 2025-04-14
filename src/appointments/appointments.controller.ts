import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {AppointmentsService} from "./appointments.service";
import {AppointmentsDTO} from "./dtos/appointmentsDTO";
import {Response} from "express";

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService) {}

    @Post("create")
    async create(@Body() data: AppointmentsDTO, @Res() res: Response){
        const appointment = await this.appointmentService.create(data);

        return res.status(200).json(appointment);
    }


    @Get("all")
    async all(@Res() res: Response){
        const appoitmens = await this.appointmentService.all();
        return res.status(200).json(appoitmens);
    }

    @Get("find/:id")
    async find(@Param("id") appoitmentsId: string, @Res() res: Response){
        const appointment = await this.appointmentService.find(appoitmentsId);
        return res.status(200).json(appointment);
    }
}
