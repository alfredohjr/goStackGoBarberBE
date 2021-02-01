import { response } from 'express';
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

interface Request {
    provider_id: String;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request ): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentSameDate) {
            throw Error('This appointment is already booked.');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
