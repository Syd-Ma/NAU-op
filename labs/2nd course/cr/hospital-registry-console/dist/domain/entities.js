"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = exports.ScheduleSlotSchema = exports.PatientSchema = exports.DoctorSchema = void 0;
const zod_1 = require("zod");
exports.DoctorSchema = zod_1.z.object({
    id: zod_1.z.string(),
    firstName: zod_1.z.string().min(1, "Імʼя обовʼязкове"),
    lastName: zod_1.z.string().min(1, "Прізвище обовʼязкове"),
    specialization: zod_1.z.string().min(1, "Спеціалізація обовʼязкова"),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional()
});
exports.PatientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    birthDate: zod_1.z.string().optional(),
    cardNotes: zod_1.z.array(zod_1.z.object({ at: zod_1.z.string(), note: zod_1.z.string() })).default([])
});
exports.ScheduleSlotSchema = zod_1.z.object({
    id: zod_1.z.string(),
    doctorId: zod_1.z.string(),
    start: zod_1.z.string(),
    end: zod_1.z.string(),
    capacity: zod_1.z.number().int().positive().default(1)
});
exports.AppointmentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    doctorId: zod_1.z.string(),
    patientId: zod_1.z.string(),
    slotId: zod_1.z.string(),
    createdAt: zod_1.z.string()
});
