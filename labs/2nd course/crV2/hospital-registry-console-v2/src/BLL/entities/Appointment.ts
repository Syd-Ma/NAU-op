import { ID } from "../types/ID";

export class Appointment {
    private readonly _id: ID;
    private readonly _doctorId: ID;
    private readonly _patientId: ID;
    private readonly _slotId: ID;

    constructor(id: ID, doctorId: ID, patientId: ID, slotId: ID) {
        this._id = id;
        this._doctorId = doctorId;
        this._patientId = patientId;
        this._slotId = slotId;
    }

    get id(): ID {
        return this._id;
    }

    get doctorId(): ID {
        return this._doctorId;
    }

    get patientId(): ID {
        return this._patientId;
    }

    get slotId(): ID {
        return this._slotId;
    }
}
