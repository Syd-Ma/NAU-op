import { IPatientRepository } from "../repositories/IPatientRepository";
import { Patient } from "../entities/Patient";
import { generateId } from "../utils/idGenerator";
import { ID } from "../types/ID";
import { NotFoundError } from "../errors/NotFoundError";

export class PatientService {
    private readonly _repo: IPatientRepository;

    constructor(repo: IPatientRepository) {
        this._repo = repo;
    }

    async registerPatient(firstName: string, lastName: string, phone: string): Promise<Patient> {
        const patient = new Patient(generateId(), firstName, lastName, phone);
        await this._repo.add(patient);
        return patient;
    }

    async updatePatient(patient: Patient): Promise<void> {
        const existing = await this._repo.getById(patient.id);
        if (!existing) throw new NotFoundError("Patient");
        await this._repo.update(patient);
    }

    async removePatient(id: ID): Promise<void> {
        const existing = await this._repo.getById(id);
        if (!existing) throw new NotFoundError("Patient");
        await this._repo.remove(id);
    }

    async getPatientById(id: ID): Promise<Patient> {
        const patient = await this._repo.getById(id);
        if (!patient) throw new NotFoundError("Patient");
        return patient;
    }

    async listPatients(): Promise<Patient[]> {
        return this._repo.list();
    }

    async searchPatients(query: string): Promise<Patient[]> {
        return this._repo.findByName(query);
    }
}
