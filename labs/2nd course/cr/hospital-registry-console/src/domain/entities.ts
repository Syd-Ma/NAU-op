import { z } from "zod";

export const DoctorSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, "Імʼя обовʼязкове"),
    lastName: z.string().min(1, "Прізвище обовʼязкове"),
    specialization: z.string().min(1, "Спеціалізація обовʼязкова"),
    phone: z.string().optional(),
    email: z.string().email().optional()
});
export type Doctor = z.infer<typeof DoctorSchema>;

export const PatientSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    birthDate: z.string().optional(),
    cardNotes: z.array(z.object({ at: z.string(), note: z.string() })).default([])
});
export type Patient = z.infer<typeof PatientSchema>;

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
export type Appointment = z.infer<typeof AppointmentSchema>;
