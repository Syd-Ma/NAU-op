import { describe, it, expect } from "vitest";
import { ScheduleService } from "../src/BLL/services/ScheduleService";
import { IScheduleRepository } from "../src/DAL/repositories/IScheduleRepository";
import { IDoctorRepository } from "../src/DAL/repositories/IDoctorRepository";
import { ScheduleSlot } from "../src/BLL/entities/ScheduleSlot";
import { Doctor } from "../src/BLL/entities/Doctor";
import { ID } from "../src/BLL/types/ID";
import { NotFoundError } from "../src/BLL/errors/NotFoundError";
import { SlotOverlapError } from "../src/BLL/errors/SlotOverlapError";

class InMemoryScheduleRepo implements IScheduleRepository {
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

class InMemoryDoctorRepo implements IDoctorRepository {
    private doctors: Doctor[] = [];

    async add(doctor: Doctor): Promise<void> {
        this.doctors.push(doctor);
    }

    async update(): Promise<void> {
    }

    async remove(): Promise<void> {
    }

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

describe("ScheduleService", () => {
    it("створює новий слот для існуючого лікаря без перетинів (AAA)", async () => {
        const scheduleRepo = new InMemoryScheduleRepo();
        const doctorRepo = new InMemoryDoctorRepo();
        const service = new ScheduleService(scheduleRepo, doctorRepo);

        const doctor = new Doctor("doc-1", "Ivan", "Ivanov", "Therapist");
        await doctorRepo.add(doctor);

        const start = "2025-11-20T10:00:00.000Z";
        const end = "2025-11-20T11:00:00.000Z";

        const slot = await service.createSlot(doctor.id, start, end);

        const slots = await service.listSlotsByDoctor(doctor.id);
        expect(slots).toHaveLength(1);
        expect(slots[0].id).toBe(slot.id);
    });

    it("кидає NotFoundError, якщо лікаря не існує (AAA)", async () => {
        const scheduleRepo = new InMemoryScheduleRepo();
        const doctorRepo = new InMemoryDoctorRepo();
        const service = new ScheduleService(scheduleRepo, doctorRepo);

        await expect(
            service.createSlot("no-such-doctor", "2025-11-20T10:00:00.000Z", "2025-11-20T11:00:00.000Z")
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("кидає SlotOverlapError при спробі створити перехресний слот (AAA)", async () => {
        const scheduleRepo = new InMemoryScheduleRepo();
        const doctorRepo = new InMemoryDoctorRepo();
        const service = new ScheduleService(scheduleRepo, doctorRepo);

        const doctor = new Doctor("doc-2", "Petro", "Petrenko", "Cardiologist");
        await doctorRepo.add(doctor);

        await service.createSlot(
            doctor.id,
            "2025-11-20T10:00:00.000Z",
            "2025-11-20T11:00:00.000Z"
        );

        await expect(
            service.createSlot(
                doctor.id,
                "2025-11-20T10:30:00.000Z",
                "2025-11-20T11:30:00.000Z"
            )
        ).rejects.toBeInstanceOf(SlotOverlapError);
    });
});
