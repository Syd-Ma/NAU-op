"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverbookingError = exports.SlotUnavailableError = exports.DuplicateError = exports.ValidationError = exports.NotFoundError = exports.DomainError = void 0;
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = new.target.name;
    }
}
exports.DomainError = DomainError;
class NotFoundError extends DomainError {
}
exports.NotFoundError = NotFoundError;
class ValidationError extends DomainError {
}
exports.ValidationError = ValidationError;
class DuplicateError extends DomainError {
}
exports.DuplicateError = DuplicateError;
class SlotUnavailableError extends DomainError {
}
exports.SlotUnavailableError = SlotUnavailableError;
class OverbookingError extends DomainError {
}
exports.OverbookingError = OverbookingError;
