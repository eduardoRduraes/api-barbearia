import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AppointmentsService} from "./appointments.service";
import {AppointmentsDTO} from "./dtos/appointmentsDTO";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService) {}


    @UseGuards(JwtAuthGuard)
    @Post("create")
    async create(@Body() data: AppointmentsDTO){
        try {
            const appointment = await this.appointmentService.create(data);
            return {statusCode: HttpStatus.CREATED, message:"Agendamento criado com sucesso!", data: appointment};
        }catch (error){
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message || "Erro ao criar agendamento!",
            },HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("all")
    async all(){
        const appointments = await this.appointmentService.all();
        return appointments.length > 0 ? {statusCode: HttpStatus.OK, message:"Agendamentos encontrados!", data: appointments} : {statusCode: HttpStatus.OK, message:"Não existe agendamentos salvos", data:appointments};
    }
    @UseGuards(JwtAuthGuard)
    @Get("find/:id")
    async find(@Param("id") appoitmentId: string){
        try {
            const appointment = await this.appointmentService.find(appoitmentId);
            return {statusCode: HttpStatus.OK, message:"Agendamento encontrado!", data:appointment};
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, message: error.message || "Agendamento não econtrado!"}, HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put("update/:id")
    async update(@Param("id") appointmentId: string){
        try {
            const message = await this.appointmentService.remove(appointmentId);
            return {statusCode: HttpStatus.OK, message};
        }catch (error){
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, message: error.message || "Agendamento não encontrado!"}, HttpStatus.NOT_FOUND);
        }
    }
}
