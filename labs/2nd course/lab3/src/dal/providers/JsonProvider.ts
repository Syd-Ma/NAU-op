import { promises as fs } from 'fs'
import { DataProvider } from './DataProvider.js'
export class JsonProvider<T> extends DataProvider<T> {
    async save(data: T): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8')
    }
    async load(): Promise<T> {
        try {
            const text = await fs.readFile(this.filePath, 'utf8')
            return JSON.parse(text)
        } catch {
            return [] as T
        }
    }
}