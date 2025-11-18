import { describe, it, expect } from "vitest";
import { AppointmentService } from "../src/BLL/services/AppointmentService";
import { IAppointmentRepository } from "../src/DAL/repositories/IAppointmentRepository";
import { IScheduleRepository } from "../src/DAL/repositories/IScheduleRepository";
import { IDoctorRepository } from "../src/DAL/repositories/IDoctorRepository";
import { IPatientRepository } from "../src/DAL/repositories/IPatientRepository";
import { Appointment } from "../src/BLL/entities/Appointment";
import { ScheduleSlot } from "../src/BLL/entities/ScheduleSlot";
import { Doctor } from "../src/BLL/entities/Doctor";
import { Patient } from "../src/BLL/entities/Patient";
import { ID } from "../src/BLL/types/ID";
import { NotFoundError } from "../src/BLL/errors/NotFoundError";
import { SlotBusyError } from "../src/BLL/errors/SlotBusyError";

class InMemoryAppointmentRepo implements IAppointmentRepository {
    private appointments: Appointment[] = [];

    async add(a: Appointment): Promise<void> {
        this.appointments.push(a);
    }

    async remove(id: ID): Promise<void> {
        this.appointments = this.appointments.filter(ap => ap.id !== id);
    }

    async listBySlot(slotId: ID): Promise<Appointment[]> {
        return this.appointments.filter(ap => ap.slotId === slotId);
    }

    async listByDoctor(doctorId: ID): Promise<Appointment[]> {
        return this.appointments.filter(ap => ap.doctorId === doctorId);
    }

    async listByPatient(patientId: ID): Promise<Appointment[]> {
        return this.appointments.filter(ap => ap.patientId === patientId);
    }
}

class InMemoryScheduleRepoA implements IScheduleRepository {
    private slots: ScheduleSlot[] = [];

    async addSlot(slot: ScheduleSlot): Promise<void> {
        this.slots.push(slot);
    }

    async updateSlot(slot: ScheduleSlot): Promise<void> {
        const i = this.slots.findIndex(s => s.id === slot.id);
        if (i >= 0) this.slots[i] = slot;
    }

    async removeSlot(id: ID): Promise<void> {
        this.slots = this.slots.filter(s => s.id !== id);
    }

    async getSlotById(id: ID): Promise<ScheduleSlot | undefined> {
        return this.slots.find(s => s.id === id);
    }

    async listSlotsByDoctor(doctorId: ID): Promise<ScheduleSlot[]> {
        return this.slots.filter(s => s.doctorId === doctorId);
    }
}

class InMemoryDoctorRepoA implements IDoctorRepository {
    private doctors: Doctor[] = [];

    async add(doctor: Doctor): Promise<void> {
        this.doctors.push(doctor);
    }

    async update(): Promise<void> {}

    async remove(): Promise<void> {}

    async getById(id: ID): Promise<Doctor | undefined> {
        return this.doctors.find(d => d.id === id);
    }

    async list(): Promise<Doctor[]> {
        return [...this.doctors];
    }

    async findByNameOrSpec(): Promise<Doctor[]> {
        return [];
    }
}

class InMemoryPatientRepoA implements IPatientRepository {
    private patients: Patient[] = [];

    async add(patient: Patient): Promise<void> {
        this.patients.push(patient);
    }

    async update(): Promise<void> {}

    async remove(): Promise<void> {}

    async getById(id: ID): Promise<Patient | undefined> {
        return this.patients.find(p => p.id === id);
    }

    async list(): Promise<Patient[]> {
        return [...this.patients];
    }

    async findByName(): Promise<Patient[]> {
        return [];
    }
}

describe("AppointmentService", () => {
    it("успішно створює запис на прийом (AAA)", async () => {
        const appointmentRepo = new InMemoryAppointmentRepo();
        const scheduleRepo = new InMemoryScheduleRepoA();
        const doctorRepo = new InMemoryDoctorRepoA();
        const patientRepo = new InMemoryPatientRepoA();

        const service = new AppointmentService(
            appointmentRepo,
            scheduleRepo,
            doctorRepo,
            patientRepo
        );

        const doctor = new Doctor("doc-1", "Ivan", "Ivanov", "Therapist");
        const patient = new Patient("pat-1", "Anna", "Petrenko", "+380931112233");
        const slot = new ScheduleSlot(
            "slot-1",
            doctor.id,
            "2025-11-20T10:00:00.000Z",
            "2025-11-20T10:30:00.000Z"
        );

        await doctorRepo.add(doctor);
        await patientRepo.add(patient);
        await scheduleRepo.addSlot(slot);

        const appointment = await service.createAppointment(
            doctor.id,
            patient.id,
            slot.id
        );

        const byDoctor = await service.listByDoctor(doctor.id);
        expect(byDoctor).toHaveLength(1);
        expect(byDoctor[0].id).toBe(appointment.id);
        expect(byDoctor[0].slotId).toBe(slot.id);
    });

    it("кидає SlotBusyError, якщо слот уже зайнятий (AAA)", async () => {
        const appointmentRepo = new InMemoryAppointmentRepo();
        const scheduleRepo = new InMemoryScheduleRepoA();
        const doctorRepo = new InMemoryDoctorRepoA();
        const patientRepo = new InMemoryPatientRepoA();
        const service = new AppointmentService(
            appointmentRepo,
            scheduleRepo,
            doctorRepo,
            patientRepo
        );

        const doctor = new Doctor("doc-2", "Petro", "Petrenko", "Cardiologist");
        const patient1 = new Patient("pat-2", "Oleh", "Shevchenko", "+380501112233");
        const patient2 = new Patient("pat-3", "Max", "Sydorets", "+380931234567");
        const slot = new ScheduleSlot(
            "slot-2",
            doctor.id,
            "2025-11-21T09:00:00.000Z",
            "2025-11-21T09:30:00.000Z"
        );

        await doctorRepo.add(doctor);
        await patientRepo.add(patient1);
        await patientRepo.add(patient2);
        await scheduleRepo.addSlot(slot);

        await service.createAppointment(doctor.id, patient1.id, slot.id);

        await expect(
            service.createAppointment(doctor.id, patient2.id, slot.id)
        ).rejects.toBeInstanceOf(SlotBusyError);
    });

    it("кидає NotFoundError, якщо лікаря не існує (AAA)", async () => {
        const appointmentRepo = new InMemoryAppointmentRepo();
        const scheduleRepo = new InMemoryScheduleRepoA();
        const doctorRepo = new InMemoryDoctorRepoA();
        const patientRepo = new InMemoryPatientRepoA();
        const service = new AppointmentService(
            appointmentRepo,
            scheduleRepo,
            doctorRepo,
            patientRepo
        );

        const patient = new Patient("pat-x", "Ghost", "Man", "+380000000000");
        const slot = new ScheduleSlot(
            "slot-x",
            "doc-x",
            "2025-11-22T09:00:00.000Z",
            "2025-11-22T09:30:00.000Z"
        );

        await patientRepo.add(patient);
        await scheduleRepo.addSlot(slot);

        await expect(
            service.createAppointment("no-such-doctor", patient.id, slot.id)
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("кидає NotFoundError, якщо пацієнта не існує (AAA)", async () => {
        const appointmentRepo = new InMemoryAppointmentRepo();
        const scheduleRepo = new InMemoryScheduleRepoA();
        const doctorRepo = new InMemoryDoctorRepoA();
        const patientRepo = new InMemoryPatientRepoA();
        const service = new AppointmentService(
            appointmentRepo,
            scheduleRepo,
            doctorRepo,
            patientRepo
        );

        const doctor = new Doctor("doc-y", "Doc", "Y", "Therapist");
        const slot = new ScheduleSlot(
            "slot-y",
            doctor.id,
            "2025-11-22T10:00:00.000Z",
            "2025-11-22T10:30:00.000Z"
        );

        await doctorRepo.add(doctor);
        await scheduleRepo.addSlot(slot);

        await expect(
            service.createAppointment(doctor.id, "no-such-patient", slot.id)
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("кидає NotFoundError, якщо слот не існує (AAA)", async () => {
        const appointmentRepo = new InMemoryAppointmentRepo();
        const scheduleRepo = new InMemoryScheduleRepoA();
        const doctorRepo = new InMemoryDoctorRepoA();
        const patientRepo = new InMemoryPatientRepoA();
        const service = new AppointmentService(
            appointmentRepo,
            scheduleRepo,
            doctorRepo,
            patientRepo
        );

        const doctor = new Doctor("doc-z", "Doc", "Z", "Therapist");
        const patient = new Patient("pat-z", "User", "Z", "+380931111111");

        await doctorRepo.add(doctor);
        await patientRepo.add(patient);

        await expect(
            service.createAppointment(doctor.id, patient.id, "no-such-slot")
        ).rejects.toBeInstanceOf(NotFoundError);
    });
});
