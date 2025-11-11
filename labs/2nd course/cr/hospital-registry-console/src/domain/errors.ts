export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}
export class NotFoundError extends DomainError {}
export class ValidationError extends DomainError {}
export class DuplicateError extends DomainError {}
export class SlotUnavailableError extends DomainError {}
export class OverbookingError extends DomainError {}
