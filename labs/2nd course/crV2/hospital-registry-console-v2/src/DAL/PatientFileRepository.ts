import { BaseFileRepository } from "./BaseFileRepository";
import { FileDb } from "./FileDb";
import { Patient } from "../BLL/entities/Patient";
import { IPatientRepository } from "../BLL/repositories/IPatientRepository";

export class PatientFileRepository
    extends BaseFileRepository<Patient>
    implements IPatientRepository {

    constructor(db: FileDb) {
        super(db, "patients");
    }

    async findByName(query: string): Promise<Patient[]> {
        const all = await this.list();
        const s = query.toLowerCase();
        return all.filter(x => x.fullName.toLowerCase().includes(s));
    }
}
