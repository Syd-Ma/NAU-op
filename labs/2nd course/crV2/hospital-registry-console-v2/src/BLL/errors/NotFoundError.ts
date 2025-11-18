import { DomainError } from "./DomainError";

export class NotFoundError extends DomainError {
    constructor(entityName: string) {
        super(`${entityName} not found`);
    }
}
