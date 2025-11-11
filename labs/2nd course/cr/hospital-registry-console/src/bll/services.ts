import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import {
    IDoctorRepository, IPatientRepository, IScheduleRepository, IAppointmentRepository
} from "../domain/repositories";
import {
    Doctor, DoctorSchema, Patient, PatientSchema,
    ScheduleSlot, ScheduleSlotSchema, Appointment
} from "../domain/entities";
import {
    ValidationError, NotFoundError, SlotUnavailableError, OverbookingError, DuplicateError
} from "../domain/errors";

const dateRangeSchema = z.object({ start: z.string(), end: z.string() })
    .refine(v => new Date(v.start) < new Date(v.end), "Початок має бути раніше за кінець");

@injectable()
export class DoctorService {
    constructor(@inject("IDoctorRepository") private repo: IDoctorRepository) {}
    async add(input: Omit<Doctor, "id">) {
        const candidate: Doctor = { id: uuid(), ...input };
        const parsed = DoctorSchema.safeParse(candidate);
        if (!parsed.success) throw new ValidationError(parsed.error.message);

        const dupes = await this.repo.findByNameOrSpec(`${input.firstName} ${input.lastName}`);
        if (dupes.some(d => d.firstName === input.firstName && d.lastName === input.lastName && d.specialization === input.specialization)) {
            throw new DuplicateError("Такий лікар (ПІБ + спеціалізація) вже існує");
        }
        await this.repo.add(candidate);
        return candidate;
    }
    async update(d: Doctor) {
        const parsed = DoctorSchema.safeParse(d);
        if (!parsed.success) throw new ValidationError(parsed.error.message);
        const existing = await this.repo.getById(d.id);
        if (!existing) throw new NotFoundError("Лікаря не знайдено");
        await this.repo.update(d);
        return d;
    }
    async remove(id: string) {
        const existing = await this.repo.getById(id);
        if (!existing) throw new NotFoundError("Лікаря не знайдено");
        await this.repo.remove(id);
    }
    async list() { return this.repo.list(); }
    async search(q: string) { return this.repo.findByNameOrSpec(q); }
}

@injectable()
export class PatientService {
    constructor(@inject("IPatientRepository") private repo: IPatientRepository) {}
    async add(input: Omit<Patient, "id" | "cardNotes">) {
        const candidate: Patient = { id: uuid(), cardNotes: [], ...input };
        const parsed = PatientSchema.safeParse(candidate);
        if (!parsed.success) throw new ValidationError(parsed.error.message);
        await this.repo.add(candidate);
        return candidate;
    }
    async update(p: Patient) {
        const parsed = PatientSchema.safeParse(p);
        if (!parsed.success) throw new ValidationError(parsed.error.message);
        const existing = await this.repo.getById(p.id);
        if (!existing) throw new NotFoundError("Пацієнта не знайдено");
        await this.repo.update(p);
        return p;
    }
    async remove(id: string) {
        const existing = await this.repo.getById(id);
        if (!existing) throw new NotFoundError("Пацієнта не знайдено");
        await this.repo.remove(id);
    }
    async list() { return this.repo.list(); }
    async search(q: string) { return this.repo.findByName(q); }
    async addNote(patientId: string, note: string) {
        const p = await this.repo.getById(patientId);
        if (!p) throw new NotFoundError("Пацієнта не знайдено");
        p.cardNotes.push({ at: new Date().toISOString(), note });
        await this.repo.update(p);
        return p;
    }
}

@injectable()
export class ScheduleService {
    constructor(
        @inject("IScheduleRepository") private schedules: IScheduleRepository,
        @inject("IDoctorRepository") private doctors: IDoctorRepository
    ) {}
    async addSlot(input: Omit<ScheduleSlot, "id">) {
        const parsed = ScheduleSlotSchema.omit({ id: true }).and(dateRangeSchema).safeParse(input as any);
        if (!parsed.success) throw new ValidationError(parsed.error.message);
        const doc = await this.doctors.getById(input.doctorId);
        if (!doc) throw new NotFoundError("Лікаря не знайдено");
        const slot: ScheduleSlot = { id: uuid(), ...input };
        await this.schedules.addSlot(slot);
        return slot;
    }
    async updateSlot(s: ScheduleSlot) {
        const parsed = ScheduleSlotSchema.safeParse(s);
        if (!parsed.success) throw new ValidationError(parsed.error.message);
        const existing = await this.schedules.getSlotById(s.id);
        if (!existing) throw new NotFoundError("Слот не знайдено");
        await this.schedules.updateSlot(s);
        return s;
    }
    async removeSlot(id: string) { await this.schedules.removeSlot(id); }
    async listByDoctor(doctorId: string) { return this.schedules.listSlotsByDoctor(doctorId); }
}

@injectable()
export class AppointmentService {
    constructor(
        @inject("IAppointmentRepository") private appts: IAppointmentRepository,
        @inject("IScheduleRepository") private schedules: IScheduleRepository,
        @inject("IPatientRepository") private patients: IPatientRepository,
        @inject("IDoctorRepository") private doctors: IDoctorRepository
    ) {}
    async book(doctorId: string, patientId: string, slotId: string) {
        const [doc, pat, slot] = await Promise.all([
            this.doctors.getById(doctorId),
            this.patients.getById(patientId),
            this.schedules.getSlotById(slotId)
        ]);
        if (!doc) throw new NotFoundError("Лікаря не знайдено");
        if (!pat) throw new NotFoundError("Пацієнта не знайдено");
        if (!slot || slot.doctorId !== doctorId) throw new SlotUnavailableError("Слот недоступний для цього лікаря");

        const current = await this.appts.listBySlot(slotId);
        if (current.length >= (slot.capacity ?? 1)) throw new OverbookingError("Перевищено місткість слота");
        const a: Appointment = { id: uuid(), doctorId, patientId, slotId, createdAt: new Date().toISOString() };
        await this.appts.add(a);
        return a;
    }
    async cancel(appointmentId: string) { await this.appts.remove(appointmentId); }
    async listByDoctor(doctorId: string) { return this.appts.listByDoctor(doctorId); }
    async listByPatient(patientId: string) { return this.appts.listByPatient(patientId); }
}
