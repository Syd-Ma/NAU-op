import { promises as fs } from "fs";
import * as path from "path";

export class FileDb {
    private readonly _rootDir: string;

    constructor(rootDir: string) {
        this._rootDir = rootDir;
    }

    private getFilePath(collection: string): string {
        return path.join(this._rootDir, `${collection}.json`);
    }

    private async ensureFile(collection: string): Promise<void> {
        const filePath = this.getFilePath(collection);
        try {
            await fs.access(filePath);
        } catch {
            await fs.mkdir(this._rootDir, { recursive: true });
            await fs.writeFile(filePath, "[]", "utf-8");
        }
    }

    async read<T>(collection: string): Promise<T[]> {
        await this.ensureFile(collection);
        const filePath = this.getFilePath(collection);
        const content = await fs.readFile(filePath, "utf-8");
        if (!content.trim()) return [];
        return JSON.parse(content) as T[];
    }

    async write<T>(collection: string, data: T[]): Promise<void> {
        await this.ensureFile(collection);
        const filePath = this.getFilePath(collection);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    }
}
