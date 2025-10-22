import { promises as fs } from 'fs'
import { DataProvider } from './DataProvider.js'
export class BinaryProvider<T> extends DataProvider<T> {
    async save(data: T): Promise<void> {
        const buffer = Buffer.from(JSON.stringify(data), 'utf8')
        await fs.writeFile(this.filePath, buffer)
    }
    async load(): Promise<T> {
        try {
            const buffer = await fs.readFile(this.filePath)
            return JSON.parse(buffer.toString('utf8'))
        } catch {
            return [] as T
        }
    }
}