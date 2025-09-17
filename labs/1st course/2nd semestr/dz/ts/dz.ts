export default class Student {
    constructor(
        public firstName: string,
        public lastName: string,
        public patronymic: string
    ) {}
}

export class StudentClass {
    private students: Student[] = [];

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public getColumn(columnName: string): string[] {
        switch (columnName.toLowerCase()) {
            case "ім’я":
            case "firstname":
                return this.students.map((s) => s.firstName);
            case "прізвище":
            case "lastname":
                return this.students.map((s) => s.lastName);
            case "по батькові":
            case "patronymic":
                return this.students.map((s) => s.patronymic);
            default:
                throw new Error("Неправильна назва стовпця");
        }
    }

    public countNechai(): number {
        return this.students.filter(
            (s) => s.lastName.toLowerCase() === "нечай"
        ).length;
    }
}

