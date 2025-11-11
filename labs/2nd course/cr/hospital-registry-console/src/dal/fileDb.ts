import fs from "fs-extra";

type TableName = "doctors" | "patients" | "slots" | "appointments";

export class FileDb {
    constructor(private baseDir: string) {
        fs.ensureDirSync(baseDir);
    }
    private path(name: TableName) {
        return `${this.baseDir}/${name}.json`;
    }

    async read<T>(name: TableName): Promise<T[]> {
        const p = this.path(name);
        if (!(await fs.pathExists(p))) return [];
        const buf = await fs.readFile(p, "utf-8");
        try { return JSON.parse(buf) as T[]; } catch { return []; }
    }

    async write<T>(name: TableName, data: T[]): Promise<void> {
        const p = this.path(name);
        await fs.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
    }
}
