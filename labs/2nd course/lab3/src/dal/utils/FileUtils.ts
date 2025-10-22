import { promises as fs } from 'fs'
export class FileUtils {
    static async exists(path: string): Promise<boolean> {
        try {
            await fs.access(path)
            return true
        } catch {
            return false
        }
    }
}