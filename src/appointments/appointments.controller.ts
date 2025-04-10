import {Controller, Get} from '@nestjs/common';
import {AppointmentsService} from "./appointments.service";

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService) {}
    @Get("all")
    async all() {
        return this.appointmentService.allAppointements();
    }

}
