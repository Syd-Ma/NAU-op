import { DomainError } from "./DomainError";

export class SlotOverlapError extends DomainError {
    constructor() {
        super("Schedule slot overlaps with existing slots");
    }
}
