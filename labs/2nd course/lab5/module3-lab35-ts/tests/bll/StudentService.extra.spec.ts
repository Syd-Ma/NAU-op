import { describe, it, expect } from "vitest"
import { StudentService } from "../../src/bll/StudentService"
import { IStudentRepository } from "../../src/domain/IStudentRepository"
import { Student } from "../../src/domain/Student"
import { Gender } from "../../src/domain/Gender"
import { ValidationError } from "../../src/bll/ValidationError"

class FakeRepo implements IStudentRepository {
    constructor(private data: ReadonlyArray<Student>) {}
    getAll(): Promise<ReadonlyArray<Student>> { return Promise.resolve(this.data) }
}

describe("StudentService validation", () => {
    it("throws on invalid year", async () => {
        const svc = new StudentService(new FakeRepo([]))
        await expect(svc.graduateWithHonors(1800, "НАУ", 90)).rejects.toBeInstanceOf(ValidationError)
        await expect(svc.graduateWithHonors(3000, "НАУ", 90)).rejects.toBeInstanceOf(ValidationError)
    })

    it("throws on empty university", async () => {
        const svc = new StudentService(new FakeRepo([]))
        await expect(svc.graduateWithHonors(2025, " ", 90)).rejects.toBeInstanceOf(ValidationError)
    })

    it("throws on invalid threshold in count", async () => {
        const svc = new StudentService(new FakeRepo([]))
        await expect(svc.countFemaleDistinctionsOn5(-1)).rejects.toBeInstanceOf(ValidationError)
        await expect(svc.countFemaleDistinctionsOn5(101)).rejects.toBeInstanceOf(ValidationError)
    })
})
