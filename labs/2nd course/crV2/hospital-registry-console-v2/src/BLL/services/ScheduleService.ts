import { IScheduleRepository } from "../../DAL/repositories/IScheduleRepository";
import { IDoctorRepository } from "../../DAL/repositories/IDoctorRepository";
import { ScheduleSlot } from "../entities/ScheduleSlot";
import { ID } from "../types/ID";
import { generateId } from "../../utils/idGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { SlotOverlapError } from "../errors/SlotOverlapError";

export class ScheduleService {
    private readonly _scheduleRepo: IScheduleRepository;
    private readonly _doctorRepo: IDoctorRepository;

    constructor(scheduleRepo: IScheduleRepository, doctorRepo: IDoctorRepository) {
        this._scheduleRepo = scheduleRepo;
        this._doctorRepo = doctorRepo;
    }

    async createSlot(doctorId: ID, startIso: string, endIso: string): Promise<ScheduleSlot> {
        const doctor = await this._doctorRepo.getById(doctorId);
        if (!doctor) throw new NotFoundError("Doctor");

        const slot = new ScheduleSlot(generateId(), doctorId, startIso, endIso);
        const existing = await this._scheduleRepo.listSlotsByDoctor(doctorId);
        const overlaps = existing.some(s => slot.overlaps(s));
        if (overlaps) throw new SlotOverlapError();

        await this._scheduleRepo.addSlot(slot);
        return slot;
    }

    async listSlotsByDoctor(doctorId: ID): Promise<ScheduleSlot[]> {
        return this._scheduleRepo.listSlotsByDoctor(doctorId);
    }

    async removeSlot(id: ID): Promise<void> {
        await this._scheduleRepo.removeSlot(id);
    }

    async getSlot(id: ID): Promise<ScheduleSlot> {
        const slot = await this._scheduleRepo.getSlotById(id);
        if (!slot) throw new NotFoundError("Schedule slot");
        return slot;
    }
}
