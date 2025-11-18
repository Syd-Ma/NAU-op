import { ID } from "../types/ID";

export class ScheduleSlot {
    private readonly _id: ID;
    private readonly _doctorId: ID;
    private _startIso: string;
    private _endIso: string;

    constructor(id: ID, doctorId: ID, startIso: string, endIso: string) {
        this._id = id;
        this._doctorId = doctorId;
        this._startIso = startIso;
        this._endIso = endIso;
    }

    get id(): ID {
        return this._id;
    }

    get doctorId(): ID {
        return this._doctorId;
    }

    get startIso(): string {
        return this._startIso;
    }

    get endIso(): string {
        return this._endIso;
    }

    set startIso(value: string) {
        this._startIso = value;
    }

    set endIso(value: string) {
        this._endIso = value;
    }

    overlaps(other: ScheduleSlot): boolean {
        if (this._doctorId !== other._doctorId) return false;

        const startA = new Date(this._startIso).getTime();
        const endA = new Date(this._endIso).getTime();
        const startB = new Date(other._startIso).getTime();
        const endB = new Date(other._endIso).getTime();

        return startA < endB && endA > startB;
    }
}
