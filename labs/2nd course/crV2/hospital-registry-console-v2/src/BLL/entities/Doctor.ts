import { ID } from "../types/ID";

export class Doctor {
    private readonly _id: ID;
    private _firstName: string;
    private _lastName: string;
    private _specialization: string;

    constructor(id: ID, firstName: string, lastName: string, specialization: string) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._specialization = specialization;
    }

    get id(): ID {
        return this._id;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get specialization(): string {
        return this._specialization;
    }

    set specialization(value: string) {
        this._specialization = value;
    }

    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}
