
import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { DoctorService } from "../bll/services";
import { InMemoryDoctorRepo } from "./mocks/InMemoryDoctorRepo";

describe("DoctorService", () => {
    let service: DoctorService;

    beforeEach(() => {
        const repo = new InMemoryDoctorRepo();
        service = new DoctorService(repo as any);
    });

    it("створює лікаря (AAA: Arrange-Act-Assert)", async () => {
        const dto = {
            firstName: "Іван",
            lastName: "Іванов",
            specialization: "Кардіолог",
        };

        const created = await service.add(dto);

        expect(created.id).toBeDefined();
        expect(created.firstName).toBe("Іван");
        expect(created.lastName).toBe("Іванов");
        expect(created.specialization).toBe("Кардіолог");
    });

    it("знаходить лікаря за спеціалізацією (AAA)", async () => {
        await service.add({
            firstName: "Марія",
            lastName: "Коваль",
            specialization: "Терапевт",
        });

        const found = await service.search("Терапевт");

        expect(found.length).toBe(1);
        expect(found[0].specialization).toBe("Терапевт");
    });
});