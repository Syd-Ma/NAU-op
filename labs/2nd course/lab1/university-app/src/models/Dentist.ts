import { IPerson } from "../interfaces";

export class Dentist implements IPerson {
    constructor(
        public firstName: string,
        public lastName: string,
        public id: string,
        public clinicName: string = ""
    ) {}

    ability(): void {
        console.log(`${this.firstName} ${this.lastName} treats teeth`);
    }

    toSaveBlock(): string {
        const objectName = `${this.firstName}${this.lastName}`.replace(/\s+/g, "");
        const obj = {
            firstname: this.firstName,
            lastname: this.lastName,
            id: this.id,
            clinicName: this.clinicName
        };
        return `Dentist ${objectName}\n${JSON.stringify(obj, null, 2)};\n`;
    }

    static fromObject(obj: any): Dentist {
        return new Dentist(obj.firstname ?? "Unknown", obj.lastname ?? "Unknown", obj.id ?? "", obj.clinicName ?? "");
    }
}
