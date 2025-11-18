import { IAppointmentRepository } from "../repositories/IAppointmentRepository";
import { IScheduleRepository } from "../repositories/IScheduleRepository";
import { IDoctorRepository } from "../repositories/IDoctorRepository";
import { IPatientRepository } from "../repositories/IPatientRepository";
import { Appointment } from "../entities/Appointment";
import { ID } from "../types/ID";
import { generateId } from "../utils/idGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { SlotBusyError } from "../errors/SlotBusyError";

export class AppointmentService {
    private readonly _appointmentRepo: IAppointmentRepository;
    private readonly _scheduleRepo: IScheduleRepository;
    private readonly _doctorRepo: IDoctorRepository;
    private readonly _patientRepo: IPatientRepository;

    constructor(
        appointmentRepo: IAppointmentRepository,
        scheduleRepo: IScheduleRepository,
        doctorRepo: IDoctorRepository,
        patientRepo: IPatientRepository
    ) {
        this._appointmentRepo = appointmentRepo;
        this._scheduleRepo = scheduleRepo;
        this._doctorRepo = doctorRepo;
        this._patientRepo = patientRepo;
    }

    async createAppointment(doctorId: ID, patientId: ID, slotId: ID): Promise<Appointment> {
        const [doctor, patient, slot] = await Promise.all([
            this._doctorRepo.getById(doctorId),
            this._patientRepo.getById(patientId),
            this._scheduleRepo.getSlotById(slotId)
        ]);

        if (!doctor) throw new NotFoundError("Doctor");
        if (!patient) throw new NotFoundError("Patient");
        if (!slot) throw new NotFoundError("Schedule slot");
        if (slot.doctorId !== doctorId) {
            throw new Error("Slot does not belong to this doctor");
        }

        const existing = await this._appointmentRepo.listBySlot(slotId);
        if (existing.length > 0) throw new SlotBusyError();

        const appointment = new Appointment(generateId(), doctorId, patientId, slotId);
        await this._appointmentRepo.add(appointment);
        return appointment;
    }

    async cancelAppointment(id: ID): Promise<void> {
        await this._appointmentRepo.remove(id);
    }

    async listByDoctor(doctorId: ID): Promise<Appointment[]> {
        return this._appointmentRepo.listByDoctor(doctorId);
    }

    async listByPatient(patientId: ID): Promise<Appointment[]> {
        return this._appointmentRepo.listByPatient(patientId);
    }

    async listBySlot(slotId: ID): Promise<Appointment[]> {
        return this._appointmentRepo.listBySlot(slotId);
    }
}
