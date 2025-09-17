import { IPerson } from "../interfaces";

export class Storyteller implements IPerson {
    constructor(
        public firstName: string,
        public lastName: string,
        public id: string,
        public favoriteGenre: string = "folk"
    ) {}

    ability(): void {
        console.log(`${this.firstName} ${this.lastName} tells a story (genre: ${this.favoriteGenre})`);
    }

    toSaveBlock(): string {
        const objectName = `${this.firstName}${this.lastName}`.replace(/\s+/g, "");
        const obj = {
            firstname: this.firstName,
            lastname: this.lastName,
            id: this.id,
            favoriteGenre: this.favoriteGenre
        };
        return `Storyteller ${objectName}\n${JSON.stringify(obj, null, 2)};\n`;
    }

    static fromObject(obj: any): Storyteller {
        return new Storyteller(obj.firstname ?? "Unknown", obj.lastname ?? "Unknown", obj.id ?? "", obj.favoriteGenre ?? "folk");
    }
}
