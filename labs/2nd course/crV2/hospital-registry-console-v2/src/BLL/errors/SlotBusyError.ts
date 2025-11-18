import { DomainError } from "./DomainError";

export class SlotBusyError extends DomainError {
    constructor() {
        super("Schedule slot is already booked");
    }
}
