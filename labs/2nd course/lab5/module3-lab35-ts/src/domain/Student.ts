import { Gender } from "./Gender"

export class Student {
    readonly lastName: string
    readonly firstName: string
    readonly course: number
    readonly studentCard: string
    readonly gender: Gender
    readonly averageGrade: number
    readonly taxId: string

    constructor(
        lastName: string,
        firstName: string,
        course: number,
        studentCard: string,
        gender: Gender,
        averageGrade: number,
        taxId: string
    ) {
        Student.validate(lastName, firstName, course, studentCard, gender, averageGrade, taxId)
        this.lastName = lastName.trim()
        this.firstName = firstName.trim()
        this.course = course
        this.studentCard = studentCard.trim()
        this.gender = gender
        this.averageGrade = averageGrade
        this.taxId = taxId
    }

    static validate(
        lastName: string,
        firstName: string,
        course: number,
        studentCard: string,
        gender: Gender,
        averageGrade: number,
        taxId: string
    ): void {
        if (!lastName?.trim()) throw new Error("Прізвище порожнє")
        if (!firstName?.trim()) throw new Error("Ім'я порожнє")
        if (!Number.isInteger(course) || course < 1 || course > 6) throw new RangeError("Курс має бути 1..6")
        if (!studentCard?.trim()) throw new Error("Студквиток порожній")
        if (typeof averageGrade !== "number" || averageGrade < 0 || averageGrade > 100) throw new RangeError("Середній бал 0..100")
        if (!taxId?.trim() || taxId.length !== 10 || !/^\d{10}$/.test(taxId)) throw new Error("ІПН має містити рівно 10 цифр")
    }

    isDistinction(threshold = 90): boolean {
        return this.averageGrade >= threshold
    }
}
