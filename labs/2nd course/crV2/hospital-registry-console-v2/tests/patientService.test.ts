import { describe, it, expect } from "vitest";
import { PatientService } from "../src/BLL/services/PatientService";
import { IPatientRepository } from "../src/DAL/repositories/IPatientRepository";
import { Patient } from "../src/BLL/entities/Patient";
import { ID } from "../src/BLL/types/ID";
import { NotFoundError } from "../src/BLL/errors/NotFoundError";

class InMemoryPatientRepo implements IPatientRepository {
    private patients: Patient[] = [];

    async add(patient: Patient): Promise<void> {
        this.patients.push(patient);
    }

    async update(patient: Patient): Promise<void> {
        const i = this.patients.findIndex(p => p.id === patient.id);
        if (i >= 0) this.patients[i] = patient;
    }

    async remove(id: ID): Promise<void> {
        this.patients = this.patients.filter(p => p.id !== id);
    }

    async getById(id: ID): Promise<Patient | undefined> {
        return this.patients.find(p => p.id === id);
    }

    async list(): Promise<Patient[]> {
        return [...this.patients];
    }

    async findByName(query: string): Promise<Patient[]> {
        const s = query.toLowerCase();
        return this.patients.filter(p => p.fullName.toLowerCase().includes(s));
    }
}

describe("PatientService", () => {
    it("створює нового пацієнта (AAA)", async () => {
        const repo = new InMemoryPatientRepo();
        const service = new PatientService(repo);
        const patient = await service.registerPatient("Petro", "Petrenko", "+380931112233");
        const all = await service.listPatients();
        expect(all).toHaveLength(1);
        expect(all[0].id).toBe(patient.id);
        expect(all[0].fullName).toBe("Petro Petrenko");
    });

    it("успішно оновлює існуючого пацієнта (AAA)", async () => {
        const repo = new InMemoryPatientRepo();
        const service = new PatientService(repo);
        const patient = await service.registerPatient("Oleh", "Shevchenko", "+380501234567");

        patient.phone = "+380971234567";
        await service.updatePatient(patient);

        const updated = await service.getPatientById(patient.id);
        expect(updated.phone).toBe("+380971234567");
    });

    it("кидає помилку при оновленні неіснуючого пацієнта (AAA)", async () => {
        const repo = new InMemoryPatientRepo();
        const service = new PatientService(repo);
        const ghost = new Patient("no-such-id", "Ghost", "Man", "+380000000000");

        await expect(service.updatePatient(ghost)).rejects.toBeInstanceOf(NotFoundError);
    });

    it("успішно видаляє пацієнта (AAA)", async () => {
        const repo = new InMemoryPatientRepo();
        const service = new PatientService(repo);
        const p1 = await service.registerPatient("Anna", "Ivanova", "+380631234567");

        await service.removePatient(p1.id);

        const all = await service.listPatients();
        expect(all).toHaveLength(0);
    });

    it("кидає помилку при видаленні неіснуючого пацієнта (AAA)", async () => {
        const repo = new InMemoryPatientRepo();
        const service = new PatientService(repo);

        await expect(service.removePatient("no-such-id")).rejects.toBeInstanceOf(NotFoundError);
    });
});
