import { IStudentRepository } from "../domain/IStudentRepository"
import { DiplomaWithHonors } from "../domain/DiplomaWithHonors"
import { Student } from "../domain/Student"
import { ValidationError } from "./ValidationError"
import { Gender } from "../domain/Gender"

export class StudentService {
    constructor(private readonly repo: IStudentRepository) {
        if (!repo) throw new Error("repo is required")
    }

    async countFemaleDistinctionsOn5(threshold = 90): Promise<number> {
        if (threshold < 0 || threshold > 100) throw new ValidationError("Поріг має бути 0..100")
        const all = await this.repo.getAll()
        return all.filter(s => s.course === 5 && s.gender === Gender.Female && s.isDistinction(threshold)).length
    }

    async graduateWithHonors(year: number, university: string, threshold = 90): Promise<DiplomaWithHonors[]> {
        if (!university?.trim()) throw new ValidationError("Назва ВНЗ обов'язкова")
        const now = new Date().getUTCFullYear()
        if (year < 1900 || year > now + 1) throw new ValidationError("Невірний рік")
        const all = await this.repo.getAll()
        return all.filter(s => s.course === 5 && s.isDistinction(threshold))
            .map(s => ({ graduate: s, year, university: university.trim() }))
    }

    async filter(predicate?: (s: Student) => boolean): Promise<ReadonlyArray<Student>> {
        const all = await this.repo.getAll()
        return predicate ? all.filter(predicate) : all
    }
}
