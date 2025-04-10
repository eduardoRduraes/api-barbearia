import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class AppointmentsService {
    constructor(private readonly prismaService: PrismaService) { }

    async all(){
        return this.prismaService.appointments.findMany({
            include: {
                user: true,
                client: true
            }
        });
    }

}
