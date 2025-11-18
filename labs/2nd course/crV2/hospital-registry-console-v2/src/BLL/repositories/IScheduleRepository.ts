import { ScheduleSlot } from "../entities/ScheduleSlot";
import { ID } from "../types/ID";

export interface IScheduleRepository {
    addSlot(slot: ScheduleSlot): Promise<void>;
    updateSlot(slot: ScheduleSlot): Promise<void>;
    removeSlot(id: ID): Promise<void>;
    getSlotById(id: ID): Promise<ScheduleSlot | undefined>;
    listSlotsByDoctor(doctorId: ID): Promise<ScheduleSlot[]>;
}
