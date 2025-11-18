import { describe, it, expect } from "vitest";
import { DoctorService } from "../src/BLL/services/DoctorService";
import { IDoctorRepository } from "../src/BLL/repositories/IDoctorRepository";
import { Doctor } from "../src/BLL/entities/Doctor";
import { ID } from "../src/BLL/types/ID";
import { NotFoundError } from "../src/BLL/errors/NotFoundError";

class InMemoryDoctorRepo implements IDoctorRepository {
    private doctors: Doctor[] = [];

    async add(doctor: Doctor): Promise<void> {
        this.doctors.push(doctor);
    }

    async update(doctor: Doctor): Promise<void> {
        const i = this.doctors.findIndex(d => d.id === doctor.id);
        if (i >= 0) this.doctors[i] = doctor;
    }

    async remove(id: ID): Promise<void> {
        this.doctors = this.doctors.filter(d => d.id !== id);
    }

    async getById(id: ID): Promise<Doctor | undefined> {
        return this.doctors.find(d => d.id === id);
    }

    async list(): Promise<Doctor[]> {
        return [...this.doctors];
    }

    async findByNameOrSpec(query: string): Promise<Doctor[]> {
        const s = query.toLowerCase();
        return this.doctors.filter(d =>
            d.fullName.toLowerCase().includes(s) ||
            d.specialization.toLowerCase().includes(s)
        );
    }
}

describe("DoctorService", () => {
    it("створює нового лікаря (AAA)", async () => {
        const repo = new InMemoryDoctorRepo();
        const service = new DoctorService(repo);

        const doctor = await service.registerDoctor("Ivan", "Ivanov", "Cardiologist");

        const all = await service.listDoctors();
        expect(all).toHaveLength(1);
        expect(all[0].id).toBe(doctor.id);
        expect(all[0].fullName).toBe("Ivan Ivanov");
    });

    it("кидає помилку при оновленні неіснуючого лікаря (AAA)", async () => {
        const repo = new InMemoryDoctorRepo();
        const service = new DoctorService(repo);
        const ghost = new Doctor("no-such-id", "Ghost", "Doc", "None");

        await expect(service.updateDoctor(ghost)).rejects.toBeInstanceOf(NotFoundError);
    });
});
