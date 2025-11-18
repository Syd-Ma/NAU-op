import { BaseFileRepository } from "./BaseFileRepository";
import { FileDb } from "./FileDb";
import { Doctor } from "../BLL/entities/Doctor";
import { IDoctorRepository } from "./repositories/IDoctorRepository";

export class DoctorFileRepository
    extends BaseFileRepository<Doctor>
    implements IDoctorRepository {

    constructor(db: FileDb) {
        super(db, "doctors");
    }

    async findByNameOrSpec(query: string): Promise<Doctor[]> {
        const all = await this.list();
        const s = query.toLowerCase();
        return all.filter(x =>
            x.fullName.toLowerCase().includes(s) ||
            x.specialization.toLowerCase().includes(s)
        );
    }
}
