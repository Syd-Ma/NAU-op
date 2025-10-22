import { promises as fs } from 'fs'
import { DataProvider } from './DataProvider.js'
export class CustomProvider<T extends any[]> extends DataProvider<T> {
    async save(data: T): Promise<void> {
        const lines = (data as any[]).map(o => Object.values(o).join(';')).join('\n')
        await fs.writeFile(this.filePath, lines, 'utf8')
    }
    async load(): Promise<T> {
        try {
            const text = await fs.readFile(this.filePath, 'utf8')
            const lines = text.trim().split('\n')
            const result = lines.map(l => {
                const [id, lastName, firstName, gender, course, grade] = l.split(';')
                return { id, lastName, firstName, gender, course: +course, grade: +grade }
            })
            return result as T
        } catch {
            return [] as unknown as T
        }
    }
}