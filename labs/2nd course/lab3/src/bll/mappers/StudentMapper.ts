import { StudentEntity } from '../../dal/entities/StudentEntity.js'
import { StudentModel } from '../models/StudentModel.js'
export class StudentMapper {
    static toModel(entity: StudentEntity): StudentModel {
        return { ...entity }
    }
    static toEntity(model: StudentModel): StudentEntity {
        return { ...model }
    }
}