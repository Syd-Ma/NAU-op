import { IDoctorRepository } from "../repositories/IDoctorRepository";
import { Doctor } from "../entities/Doctor";
import { generateId } from "../utils/idGenerator";
import { ID } from "../types/ID";
import { NotFoundError } from "../errors/NotFoundError";

export class DoctorService {
    private readonly _repo: IDoctorRepository;

    constructor(repo: IDoctorRepository) {
        this._repo = repo;
    }

    async registerDoctor(firstName: string, lastName: string, specialization: string): Promise<Doctor> {
        const doctor = new Doctor(generateId(), firstName, lastName, specialization);
        await this._repo.add(doctor);
        return doctor;
    }

    async updateDoctor(doctor: Doctor): Promise<void> {
        const existing = await this._repo.getById(doctor.id);
        if (!existing) throw new NotFoundError("Doctor");
        await this._repo.update(doctor);
    }

    async removeDoctor(id: ID): Promise<void> {
        const existing = await this._repo.getById(id);
        if (!existing) throw new NotFoundError("Doctor");
        await this._repo.remove(id);
    }

    async getDoctorById(id: ID): Promise<Doctor> {
        const doctor = await this._repo.getById(id);
        if (!doctor) throw new NotFoundError("Doctor");
        return doctor;
    }

    async listDoctors(): Promise<Doctor[]> {
        return this._repo.list();
    }

    async searchDoctors(query: string): Promise<Doctor[]> {
        return this._repo.findByNameOrSpec(query);
    }
}
