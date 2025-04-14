import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {AppointmentsDTO} from "./dtos/appointmentsDTO";

@Injectable()
export class AppointmentsService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data:AppointmentsDTO){

        await this.checkDuplicateDate(data.date);

        return this.prismaService.appointments.create({
            data:{
               state: true, ...data
            }
        });
    }

    async find(appointmentsId: string){
        const appointment = await this.prismaService.appointments.findFirst({where: {id: appointmentsId, state: true}});
        if(!appointment) throw new NotFoundException("Agendamento não encontrado!");

        return appointment;
    }

    async all(){
        return this.prismaService.appointments.findMany({
            where:{
                state: true,
            },
        });
    }

    async remove(appointmentId: string){
        const appointment = await this.find(appointmentId);

        await this.prismaService.appointments.update({
            where:{
                id: appointmentId,
            },
            data:{
                state: false
            }
        });

        return {message:"Agendamento alterado com sucesso!"};
    }

    private async checkDuplicateDate(date:Date){
        const exists = await this.prismaService.appointments.findFirst({
            where: {
                date,
                state: true
            }
        });

        if(exists) throw new ConflictException("Existe agendamento marcado para este horário!");
    }

}
