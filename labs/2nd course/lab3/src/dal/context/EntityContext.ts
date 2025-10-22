import { DataProvider } from '../providers/DataProvider.js'
import { StudentEntity } from '../entities/StudentEntity.js'
export class EntityContext {
    constructor(private provider: DataProvider<StudentEntity[]>) {}
    async load(): Promise<StudentEntity[]> {
        return await this.provider.load()
    }
    async save(data: StudentEntity[]) {
        await this.provider.save(data)
    }
}