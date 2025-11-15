import { describe, it, expect } from "vitest"
import { JsonStudentRepository } from "../../src/dal/JsonStudentRepository"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const jsonPath = join(__dirname, "../../src/dal/students.sample.json")

describe("JsonStudentRepository", () => {
    it("parses students", async () => {
        const repo = new JsonStudentRepository(jsonPath)
        const students = await repo.getAll()
        expect(students.length).toBeGreaterThan(0)
        expect(students[0].lastName).toBe("Іваненко")
    })
})
