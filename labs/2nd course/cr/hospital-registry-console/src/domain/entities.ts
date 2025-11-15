import { z } from "zod";

export const DoctorSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, "Імʼя обовʼязкове"),
    lastName: z.string().min(1, "Прізвище обовʼязкове"),
    specialization: z.string().min(1, "Спеціалізація обовʼязкова"),
    phone: z.string().optional(),
    email: z.string().email().optional()
});

export const PatientSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    birthDate: z.string().optional(),
    cardNotes: z.array(z.object({ at: z.string(), note: z.string() })).default([])
});

export const ScheduleSlotSchema = z.object({
    id: z.string(),
    doctorId: z.string(),
    start: z.string(),
    end: z.string(),
    capacity: z.number().int().positive().default(1)
});
export type ScheduleSlot = z.infer<typeof ScheduleSlotSchema>;

export const AppointmentSchema = z.object({
    id: z.string(),
    doctorId: z.string(),
    patientId: z.string(),
    slotId: z.string(),
    createdAt: z.string()
});

export abstract class Person {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public phone?: string,
        public email?: string
    ) {}

    get fullName() {
        return `${this.lastName} ${this.firstName}`;
    }
}

export class Doctor extends Person {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        public specialization: string,
        phone?: string,
        email?: string
    ) {
        super(id, firstName, lastName, phone, email);
    }
}

export class Patient extends Person {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        phone?: string,
        email?: string,
        public birthDate?: string
    ) {
        super(id, firstName, lastName, phone, email);
    }
}

export type Appointment = z.infer<typeof AppointmentSchema>;
