import { promises as fs } from "node:fs"
import { IStudentRepository } from "../domain/IStudentRepository"
import { Student } from "../domain/Student"
import { Gender } from "../domain/Gender"

type StudentDto = {
    LastName: string
    FirstName: string
    Course: number
    StudentCard: string
    Gender: string
    AverageGrade: number
    TaxId: string
}

export class JsonStudentRepository implements IStudentRepository {
    constructor(private readonly path: string) {}
    async getAll(): Promise<ReadonlyArray<Student>> {
        const raw = await fs.readFile(this.path, "utf-8")
        const dto: StudentDto[] = JSON.parse(raw) ?? []
        return dto.map(s => new Student(
            s.LastName,
            s.FirstName,
            s.Course,
            s.StudentCard,
            s.Gender?.toLowerCase() === "female" ? Gender.Female : Gender.Male,
            s.AverageGrade,
            s.TaxId
        ))
    }
}
