import { ID } from "../types/ID";

export class Patient {
    private readonly _id: ID;
    private _firstName: string;
    private _lastName: string;
    private _phone: string;

    constructor(id: ID, firstName: string, lastName: string, phone: string) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._phone = phone;
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

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}
