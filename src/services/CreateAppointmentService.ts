import { response } from 'express';
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: String;
    date: Date;
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository){
        this.appointmentsRepository = appointmentRepository;
    }

    public execute({ date, provider }: Request ): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentSameDate) {
            throw Error('This appointment is already booked.');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
