import { IPerson } from "../interfaces";

export class Student implements IPerson {
    constructor(
        public firstName: string,
        public lastName: string,
        public id: string,
        public studentId: string,
        public course: number,
        public gender: string,
        public grade: number
    ) {}

    ability(): void {
        console.log(`${this.firstName} ${this.lastName} is studying`);
    }

    isExcellentFiveCourse(): boolean {
        return (
            this.course === 5 &&
            this.gender.toLowerCase() === "female" &&
            !isNaN(this.grade) &&
            this.grade >= 90
        );
    }

    toSaveBlock(): string {
        const objectName = `${this.firstName}${this.lastName}`.replace(/\s+/g, "");
        const obj = {
            firstname: this.firstName,
            lastname: this.lastName,
            studentId: this.studentId,
            course: this.course,
            gender: this.gender,
            grade: this.grade,
            id: this.id
        };
        return `Student ${objectName}\n${JSON.stringify(obj, null, 2)};\n`;
    }

    static fromObject(obj: any): Student {
        return new Student(
            obj.firstname ?? "Unknown",
            obj.lastname ?? "Unknown",
            obj.id ?? "",
            obj.studentId ?? "",
            Number(obj.course ?? 0),
            (obj.gender ?? "").toString(),
            Number(obj.grade ?? 0)
        );
    }
}
