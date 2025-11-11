import { FileDb } from "./fileDb";
import {
    IDoctorRepository, IPatientRepository, IScheduleRepository, IAppointmentRepository
} from "../domain/repositories";
import { Doctor, Patient, ScheduleSlot, Appointment } from "../domain/entities";
import { ID } from "../domain/types";

export class DoctorFileRepo implements IDoctorRepository {
    constructor(private db: FileDb) {}
    async add(d: Doctor) {
        const all = await this.db.read<Doctor>("doctors");
        all.push(d);
        await this.db.write("doctors", all);
    }
    async update(d: Doctor) {
        const all = await this.db.read<Doctor>("doctors");
        const i = all.findIndex(x => x.id === d.id);
        if (i >= 0) { all[i] = d; await this.db.write("doctors", all); }
    }
    async remove(id: ID) {
        const all = await this.db.read<Doctor>("doctors");
        await this.db.write("doctors", all.filter(x => x.id !== id));
    }
    async getById(id: ID) {
        const all = await this.db.read<Doctor>("doctors");
        return all.find(x => x.id === id);
    }
    async list() { return this.db.read<Doctor>("doctors"); }
    async findByNameOrSpec(q: string) {
        const s = q.toLowerCase();
        const all = await this.db.read<Doctor>("doctors");
        return all.filter(x =>
            `${x.firstName} ${x.lastName}`.toLowerCase().includes(s) ||
            x.specialization.toLowerCase().includes(s)
        );
    }
}

export class PatientFileRepo implements IPatientRepository {
    constructor(private db: FileDb) {}
    async add(p: Patient) {
        const all = await this.db.read<Patient>("patients");
        all.push(p);
        await this.db.write("patients", all);
    }
    async update(p: Patient) {
        const all = await this.db.read<Patient>("patients");
        const i = all.findIndex(x => x.id === p.id);
        if (i >= 0) { all[i] = p; await this.db.write("patients", all); }
    }
    async remove(id: ID) {
        const all = await this.db.read<Patient>("patients");
        await this.db.write("patients", all.filter(x => x.id !== id));
    }
    async getById(id: ID) {
        const all = await this.db.read<Patient>("patients");
        return all.find(x => x.id === id);
    }
    async list() { return this.db.read<Patient>("patients"); }
    async findByName(q: string) {
        const s = q.toLowerCase();
        const all = await this.db.read<Patient>("patients");
        return all.filter(x => `${x.firstName} ${x.lastName}`.toLowerCase().includes(s));
    }
}

export class ScheduleFileRepo implements IScheduleRepository {
    constructor(private db: FileDb) {}
    async addSlot(s: ScheduleSlot) {
        const all = await this.db.read<ScheduleSlot>("slots");
        all.push(s);
        await this.db.write("slots", all);
    }
    async updateSlot(s: ScheduleSlot) {
        const all = await this.db.read<ScheduleSlot>("slots");
        const i = all.findIndex(x => x.id === s.id);
        if (i >= 0) { all[i] = s; await this.db.write("slots", all); }
    }
    async removeSlot(id: ID) {
        const all = await this.db.read<ScheduleSlot>("slots");
        await this.db.write("slots", all.filter(x => x.id !== id));
    }
    async getSlotById(id: ID) {
        const all = await this.db.read<ScheduleSlot>("slots");
        return all.find(x => x.id === id);
    }
    async listSlotsByDoctor(doctorId: ID) {
        const all = await this.db.read<ScheduleSlot>("slots");
        return all.filter(x => x.doctorId === doctorId);
    }
}

export class AppointmentFileRepo implements IAppointmentRepository {
    constructor(private db: FileDb) {}
    async add(a: Appointment) {
        const all = await this.db.read<Appointment>("appointments");
        all.push(a);
        await this.db.write("appointments", all);
    }
    async remove(id: ID) {
        const all = await this.db.read<Appointment>("appointments");
        await this.db.write("appointments", all.filter(x => x.id !== id));
    }
    async listBySlot(slotId: ID) {
        const all = await this.db.read<Appointment>("appointments");
        return all.filter(x => x.slotId === slotId);
    }
    async listByDoctor(doctorId: ID) {
        const all = await this.db.read<Appointment>("appointments");
        return all.filter(x => x.doctorId === doctorId);
    }
    async listByPatient(patientId: ID) {
        const all = await this.db.read<Appointment>("appointments");
        return all.filter(x => x.patientId === patientId);
    }
}

export { FileDb };
