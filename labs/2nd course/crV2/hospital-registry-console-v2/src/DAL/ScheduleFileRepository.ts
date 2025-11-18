import { BaseFileRepository } from "./BaseFileRepository";
import { FileDb } from "./FileDb";
import { ScheduleSlot } from "../BLL/entities/ScheduleSlot";
import { IScheduleRepository } from "./repositories/IScheduleRepository";
import { ID } from "../BLL/types/ID";

export class ScheduleFileRepository
    extends BaseFileRepository<ScheduleSlot>
    implements IScheduleRepository {

    constructor(db: FileDb) {
        super(db, "slots");
    }

    async addSlot(slot: ScheduleSlot): Promise<void> {
        return this.add(slot);
    }

    async updateSlot(slot: ScheduleSlot): Promise<void> {
        return this.update(slot);
    }

    async removeSlot(id: ID): Promise<void> {
        return this.remove(id);
    }

    async getSlotById(id: ID): Promise<ScheduleSlot | undefined> {
        return this.getById(id);
    }

    async listSlotsByDoctor(doctorId: ID): Promise<ScheduleSlot[]> {
        const all = await this.list();
        return all.filter(x => x.doctorId === doctorId);
    }
}
