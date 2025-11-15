import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { AppointmentService } from "../bll/services";
import { InMemoryAppointmentRepo } from "./mocks/InMemoryAppointmentRepo";
import { InMemoryScheduleRepo } from "./mocks/InMemoryScheduleRepo";
import { InMemoryPatientRepo } from "./mocks/InMemoryPatientRepo";

class FakeDoctorRepo {
    private items: any[] = [];

    async add(item: any) {
        this.items.push(item);
    }

    async getById(id: string) {
        return this.items.find(d => d.id === id) ?? null;
    }
}

describe("AppointmentService", () => {
    let service: AppointmentService;
    let apptRepo: InMemoryAppointmentRepo;
    let scheduleRepo: InMemoryScheduleRepo;
    let patientRepo: InMemoryPatientRepo;
    let doctorRepo: FakeDoctorRepo;
    let doctorId: string;
    let patientId: string;
    let slotId: string;

    beforeEach(async () => {
        apptRepo = new InMemoryAppointmentRepo();
        scheduleRepo = new InMemoryScheduleRepo();
        patientRepo = new InMemoryPatientRepo();
        doctorRepo = new FakeDoctorRepo();

        doctorId = "doc-1";
        patientId = "pat-1";
        slotId = "slot-1";

        await doctorRepo.add({
            id: doctorId,
            firstName: "Іван",
            lastName: "Іванов",
            specialization: "Кардіолог",
            phone: undefined,
            email: undefined
        });

        await patientRepo.add({
            id: patientId,
            firstName: "Максим",
            lastName: "Сидорець",
            phone: undefined,
            email: undefined,
            birthDate: undefined,
            cardNotes: []
        });

        await scheduleRepo.addSlot({
            id: slotId,
            doctorId,
            start: "2025-11-10T09:00:00Z",
            end: "2025-11-10T09:30:00Z",
            capacity: 1
        });

        service = new AppointmentService(
            apptRepo as any,
            scheduleRepo as any,
            patientRepo as any,
            doctorRepo as any
        );
    });

    it("успішно записує пацієнта на прийом (AAA)", async () => {
        const a = await service.book(doctorId, patientId, slotId);

        expect(a.id).toBeDefined();
        expect(a.doctorId).toBe(doctorId);
        expect(a.patientId).toBe(patientId);
        expect(a.slotId).toBe(slotId);

        const list = await apptRepo.listBySlot(slotId);
        expect(list.length).toBe(1);
    });
});
