import { BaseFileRepository } from "./BaseFileRepository";
import { FileDb } from "./FileDb";
import { Appointment } from "../BLL/entities/Appointment";
import { IAppointmentRepository } from "./repositories/IAppointmentRepository";
import { ID } from "../BLL/types/ID";

export class AppointmentFileRepository
    extends BaseFileRepository<Appointment>
    implements IAppointmentRepository {

    constructor(db: FileDb) {
        super(db, "appointments");
    }

    async listBySlot(slotId: ID): Promise<Appointment[]> {
        const all = await this.list();
        return all.filter(x => x.slotId === slotId);
    }

    async listByDoctor(doctorId: ID): Promise<Appointment[]> {
        const all = await this.list();
        return all.filter(x => x.doctorId === doctorId);
    }

    async listByPatient(patientId: ID): Promise<Appointment[]> {
        const all = await this.list();
        return all.filter(x => x.patientId === patientId);
    }
}
