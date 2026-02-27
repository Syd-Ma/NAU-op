import { describe, it, expect } from "vitest"
import { StudentService } from "../../src/bll/StudentService"
import { IStudentRepository } from "../../src/domain/IStudentRepository"
import { Student } from "../../src/domain/Student"
import { Gender } from "../../src/domain/Gender"

class FakeRepo implements IStudentRepository {
    constructor(private data: ReadonlyArray<Student>) {}
    getAll(): Promise<ReadonlyArray<Student>> {
        return Promise.resolve(this.data)
    }
}

const S = (ln: string, fn: string, c: number, g: Gender, avg: number, id: string) =>
    new Student(ln, fn, c, "CARD", g, avg, id)

describe("StudentService", () => {
    it("counts female distinctions on 5th course", async () => {
        const repo = new FakeRepo([
            S("Іваненко", "Олена", 5, Gender.Female, 93.5, "1234567890"),
            S("Петренко", "Ігор", 5, Gender.Male, 95.0, "0987654321"),
            S("Сидоренко", "Марія", 5, Gender.Female, 88.0, "1111111111"),
            S("Коваль", "Анна", 5, Gender.Female, 97.0, "2222222222"),
            S("Бондар", "Артем", 4, Gender.Male, 99.0, "3333333333")
        ])
        const svc = new StudentService(repo)
        const count = await svc.countFemaleDistinctionsOn5()
        expect(count).toBe(2)
    })

    it("graduateWithHonors returns diplomas", async () => {
        const repo = new FakeRepo([
            S("Іваненко", "Олена", 5, Gender.Female, 93.5, "1234567890"),
            S("Петренко", "Ігор", 5, Gender.Male, 95.0, "0987654321"),
            S("Сидоренко", "Марія", 5, Gender.Female, 88.0, "1111111111")
        ])
        const svc = new StudentService(repo)
        const diplomas = await svc.graduateWithHonors(2025, "НАУ", 90)
        expect(diplomas.length).toBe(2)
        diplomas.forEach(d => expect(d.graduate.averageGrade).toBeGreaterThanOrEqual(90))
    })
})
