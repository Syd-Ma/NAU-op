import { promises as fs } from 'fs'
import { Builder, parseStringPromise } from 'xml2js'
import { DataProvider } from './DataProvider.js'
export class XmlProvider<T> extends DataProvider<T> {
    async save(data: T): Promise<void> {
        const builder = new Builder()
        const xml = builder.buildObject({ root: { item: data } })
        await fs.writeFile(this.filePath, xml, 'utf8')
    }
    async load(): Promise<T> {
        try {
            const xml = await fs.readFile(this.filePath, 'utf8')
            const obj = await parseStringPromise(xml)
            return obj.root?.item || []
        } catch {
            return [] as T
        }
    }
}