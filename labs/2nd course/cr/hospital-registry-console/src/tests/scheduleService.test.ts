import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { ScheduleService } from "../bll/services";
import { InMemoryScheduleRepo } from "./mocks/InMemoryScheduleRepo";

class FakeDoctorRepo {
    private items: any[] = [];

    async add(item: any) {
        this.items.push(item);
    }

    async getById(id: string) {
        return this.items.find(d => d.id === id) ?? null;
    }
}

describe("ScheduleService", () => {
    let service: ScheduleService;
    let scheduleRepo: InMemoryScheduleRepo;
    let doctorRepo: FakeDoctorRepo;
    let doctorId: string;

    beforeEach(async () => {
        scheduleRepo = new InMemoryScheduleRepo();
        doctorRepo = new FakeDoctorRepo();
        doctorId = "doc-1";

        await doctorRepo.add({
            id: doctorId,
            firstName: "Іван",
            lastName: "Іванов",
            specialization: "Терапевт",
            phone: undefined,
            email: undefined
        });

        service = new ScheduleService(scheduleRepo as any, doctorRepo as any);
    });

    it("створює слот для існуючого лікаря (AAA)", async () => {
        const dto = {
            doctorId,
            start: "2025-11-10T09:00:00Z",
            end: "2025-11-10T09:30:00Z",
            capacity: 2
        };

        const slot = await service.addSlot(dto);

        expect(slot.id).toBeDefined();
        expect(slot.doctorId).toBe(doctorId);
        expect(slot.capacity).toBe(2);
    });
});
