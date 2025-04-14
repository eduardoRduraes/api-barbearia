import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {AppointmentsDTO} from "./dtos/appointmentsDTO";

@Injectable()
export class AppointmentsService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data:AppointmentsDTO){

        const exists = await this.prismaService.appointments.findFirst(
            {
                    where: {
                        date: data.date,
                        state: true
                    }
            }
        );

        if(exists) throw new NotFoundException({message: "Já existe um agendamento para esse horário!"});

        return this.prismaService.appointments.create({
            data:{
               state: true, ...data
            }
        });
    }

    async find(appointmentsId: string){
        return this.prismaService.appointments.findFirst({where: {id: appointmentsId}});
    }

    async all(){
        return this.prismaService.appointments.findMany({
            where:{
                state: true,
            },
        });
    }

    async remove(appointmentId: string){
        this.prismaService.appointments.update({
            where:{
                id: appointmentId,
            },
            data:{
                state: false
            }
        });
    }

}
