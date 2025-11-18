import { FileDb } from "./fileDb";
import {
    IDoctorRepository,
    IPatientRepository,
    IScheduleRepository,
    IAppointmentRepository
} from "../domain/repositories";
import { Doctor, Patient, ScheduleSlot, Appointment } from "../domain/entities";
import { ID } from "../domain/types";

class FileRepo<T extends { id: ID }> {
    constructor(
        protected readonly db: FileDb,
        protected readonly collection: string
    ) {}

    protected async readAll(): Promise<T[]> {
        return this.db.read<T>(this.collection);
    }

    protected async writeAll(all: T[]): Promise<void> {
        await this.db.write(this.collection, all);
    }

    async add(entity: T): Promise<void> {
        const all = await this.readAll();
        all.push(entity);
        await this.writeAll(all);
    }

    async update(entity: T): Promise<void> {
        const all = await this.readAll();
        const i = all.findIndex(x => x.id === entity.id);
        if (i >= 0) {
            all[i] = entity;
            await this.writeAll(all);
        }
    }

    async remove(id: ID): Promise<void> {
        const all = await this.readAll();
        await this.writeAll(all.filter(x => x.id !== id));
    }

    async getById(id: ID): Promise<T | undefined> {
        const all = await this.readAll();
        return all.find(x => x.id === id);
    }

    async list(): Promise<T[]> {
        return this.readAll();
    }
}

export class DoctorFileRepo
    extends FileRepo<Doctor>
    implements IDoctorRepository
{
    constructor(db: FileDb) {
        super(db, "doctors");
    }

    async add(d: Doctor) { return super.add(d); }
    async update(d: Doctor) { return super.update(d); }
    async remove(id: ID) { return super.remove(id); }
    async getById(id: ID) { return super.getById(id); }
    async list() { return super.list(); }

    async findByNameOrSpec(q: string) {
        const s = q.toLowerCase();
        const all = await this.list();
        return all.filter(x =>
            `${x.firstName} ${x.lastName}`.toLowerCase().includes(s) ||
            x.specialization.toLowerCase().includes(s)
        );
    }
}

export class PatientFileRepo
    extends FileRepo<Patient>
    implements IPatientRepository
{
    constructor(db: FileDb) {
        super(db, "patients");
    }

    async add(p: Patient) { return super.add(p); }
    async update(p: Patient) { return super.update(p); }
    async remove(id: ID) { return super.remove(id); }
    async getById(id: ID) { return super.getById(id); }
    async list() { return super.list(); }

    async findByName(q: string) {
        const s = q.toLowerCase();
        const all = await this.list();
        return all.filter(x =>
            `${x.firstName} ${x.lastName}`.toLowerCase().includes(s)
        );
    }
}

export class ScheduleFileRepo
    extends FileRepo<ScheduleSlot>
    implements IScheduleRepository
{
    constructor(db: FileDb) {
        super(db, "slots");
    }

    async addSlot(s: ScheduleSlot) { return super.add(s); }
    async updateSlot(s: ScheduleSlot) { return super.update(s); }
    async removeSlot(id: ID) { return super.remove(id); }
    async getSlotById(id: ID) { return super.getById(id); }

    async listSlotsByDoctor(doctorId: ID) {
        const all = await this.list();
        return all.filter(x => x.doctorId === doctorId);
    }
}

export class AppointmentFileRepo
    extends FileRepo<Appointment>
    implements IAppointmentRepository
{
    constructor(db: FileDb) {
        super(db, "appointments");
    }

    async add(a: Appointment) { return super.add(a); }
    async remove(id: ID) { return super.remove(id); }

    async listBySlot(slotId: ID) {
        const all = await this.list();
        return all.filter(x => x.slotId === slotId);
    }

    async listByDoctor(doctorId: ID) {
        const all = await this.list();
        return all.filter(x => x.doctorId === doctorId);
    }

    async listByPatient(patientId: ID) {
        const all = await this.list();
        return all.filter(x => x.patientId === patientId);
    }
}

export { FileDb };
