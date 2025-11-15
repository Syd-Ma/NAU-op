import { describe, it, expect } from "vitest"
import { Storyteller } from "../../../src/domain/skills/Storyteller"
import { Dentist } from "../../../src/domain/skills/Dentist"

describe("skills", () => {
    it("storyteller entertainChildren", () => {
        const s = new Storyteller()
        expect(s.entertainChildren(["mask","puppet"],["mask","puppet","drum"])).toBe(true)
        expect(s.entertainChildren(["mask","puppet"],["mask"])).toBe(false)
    })

    it("storyteller cook", () => {
        const s = new Storyteller()
        expect(s.cook("cake",["flour","sugar"])).toContain("Готово")
        expect(s.cook("cake",["flour"])).toContain("Бракує")
    })

    it("dentist cook", () => {
        const d = new Dentist()
        expect(d.cook("soup",["water"])).toContain("приготована")
        expect(d.cook("soup",[])).toContain("Немає")
    })
})

