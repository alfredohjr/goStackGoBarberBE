import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    provider_id: String;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('time with time zone')
    date: Date;

}

export default Appointment;
