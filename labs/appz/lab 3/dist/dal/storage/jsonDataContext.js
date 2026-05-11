import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { mkdir } from "node:fs/promises";
import { createSeedDatabase } from "./seedData.js";
export class JsonDataContext {
    filePath;
    database = null;
    constructor(filePath) {
        this.filePath = filePath;
    }
    async getDatabase() {
        if (this.database !== null) {
            return this.database;
        }
        this.database = await this.loadDatabase();
        return this.database;
    }
    async saveChanges() {
        if (this.database === null) {
            return;
        }
        await mkdir(dirname(this.filePath), { recursive: true });
        await writeFile(this.filePath, JSON.stringify(this.database, null, 2), "utf-8");
    }
    async loadDatabase() {
        try {
            const fileContents = await readFile(this.filePath, "utf-8");
            const parsed = JSON.parse(fileContents);
            if (parsed.exhibitions.length === 0 && parsed.sessions.length === 0) {
                const seeded = createSeedDatabase();
                await writeFile(this.filePath, JSON.stringify(seeded, null, 2), "utf-8");
                return seeded;
            }
            return parsed;
        }
        catch {
            const seeded = createSeedDatabase();
            await mkdir(dirname(this.filePath), { recursive: true });
            await writeFile(this.filePath, JSON.stringify(seeded, null, 2), "utf-8");
            return seeded;
        }
    }
}
