import { Student } from "./Student"

export interface IStudentRepository {
    getAll(): Promise<ReadonlyArray<Student>>
}
