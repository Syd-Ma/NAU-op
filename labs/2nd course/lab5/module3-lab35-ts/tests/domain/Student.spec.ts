import { describe, it, expect } from "vitest"
import { Student } from "../../src/domain/Student"
import { Gender } from "../../src/domain/Gender"

describe("Student", () => {
    it("creates with valid data", () => {
        const s = new Student("Прізвище", "Ім'я", 5, "AB123", Gender.Female, 95, "1234567890")
        expect(s.lastName).toBe("Прізвище")
        expect(s.isDistinction()).toBe(true)
    })

    it("invalid names throw", () => {
        expect(() => new Student("", "Ім'я", 5, "AB", Gender.Male, 80, "1234567890")).toThrow()
        expect(() => new Student("Прізвище", " ", 5, "AB", Gender.Male, 80, "1234567890")).toThrow()
    })

    it("invalid course throws", () => {
        expect(() => new Student("A", "B", 0, "AB", Gender.Male, 80, "1234567890")).toThrow()
        expect(() => new Student("A", "B", 7, "AB", Gender.Male, 80, "1234567890")).toThrow()
    })

    it("empty card throws", () => {
        expect(() => new Student("A", "B", 5, "", Gender.Male, 80, "1234567890")).toThrow()
    })

    it("invalid avg throws", () => {
        expect(() => new Student("A", "B", 5, "AB", Gender.Male, -1, "1234567890")).toThrow()
        expect(() => new Student("A", "B", 5, "AB", Gender.Male, 101, "1234567890")).toThrow()
    })

    it("invalid taxId throws", () => {
        for (const id of ["123456789", "12345678901", "abcdefghij", "          "]) {
            expect(() => new Student("A", "B", 5, "AB", Gender.Male, 90, id)).toThrow()
        }
    })

    it("isDistinction respects threshold", () => {
        const s1 = new Student("A", "B", 5, "AB", Gender.Female, 90, "1234567890")
        const s2 = new Student("A", "B", 5, "AB", Gender.Female, 89.99, "1234567890")
        expect(s1.isDistinction(90)).toBe(true)
        expect(s2.isDistinction(90)).toBe(false)
    })
})
