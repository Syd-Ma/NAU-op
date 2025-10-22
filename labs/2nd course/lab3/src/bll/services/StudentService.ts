import { EntityContext } from '../../dal/context/EntityContext.js'
import { StudentMapper } from '../mappers/StudentMapper.js'
import { StudentModel } from '../models/StudentModel.js'
export class StudentService {

    add(student: any) {
        this.students.push(student)
    }

    constructor(private context: EntityContext) {}
    private students: StudentModel[] = []
    async init() {
        const entities = await this.context.load()
        this.students = entities.map(StudentMapper.toModel)
    }
    async getAll(): Promise<StudentModel[]> {
        return this.students
    }
    async getExcellentGirls(): Promise<StudentModel[]> {
        return this.students.filter(s => s.gender === 'F' && s.course === 5 && s.grade >= 4.5)
    }
    async save() {
        await this.context.save(this.students.map(StudentMapper.toEntity))
    }
}