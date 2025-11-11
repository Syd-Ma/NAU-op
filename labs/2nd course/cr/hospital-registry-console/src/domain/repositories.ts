import { Doctor, Patient, ScheduleSlot, Appointment } from "./entities";
import { ID } from "./types";

export interface IDoctorRepository {
    add(d: Doctor): Promise<void>;
    update(d: Doctor): Promise<void>;
    remove(id: ID): Promise<void>;
    getById(id: ID): Promise<Doctor | undefined>;
    list(): Promise<Doctor[]>;
    findByNameOrSpec(query: string): Promise<Doctor[]>;
}

export interface IPatientRepository {
    add(p: Patient): Promise<void>;
    update(p: Patient): Promise<void>;
    remove(id: ID): Promise<void>;
    getById(id: ID): Promise<Patient | undefined>;
    list(): Promise<Patient[]>;
    findByName(query: string): Promise<Patient[]>;
}

export interface IScheduleRepository {
    addSlot(s: ScheduleSlot): Promise<void>;
    updateSlot(s: ScheduleSlot): Promise<void>;
    removeSlot(id: ID): Promise<void>;
    getSlotById(id: ID): Promise<ScheduleSlot | undefined>;
    listSlotsByDoctor(doctorId: ID): Promise<ScheduleSlot[]>;
}

export interface IAppointmentRepository {
    add(a: Appointment): Promise<void>;
    remove(id: ID): Promise<void>;
    listBySlot(slotId: ID): Promise<Appointment[]>;
    listByDoctor(doctorId: ID): Promise<Appointment[]>;
    listByPatient(patientId: ID): Promise<Appointment[]>;
}
