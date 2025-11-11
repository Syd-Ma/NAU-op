"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDb = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
class FileDb {
    constructor(baseDir) {
        this.baseDir = baseDir;
        fs_extra_1.default.ensureDirSync(baseDir);
    }
    path(name) {
        return `${this.baseDir}/${name}.json`;
    }
    async read(name) {
        const p = this.path(name);
        if (!(await fs_extra_1.default.pathExists(p)))
            return [];
        const buf = await fs_extra_1.default.readFile(p, "utf-8");
        try {
            return JSON.parse(buf);
        }
        catch {
            return [];
        }
    }
    async write(name, data) {
        const p = this.path(name);
        await fs_extra_1.default.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
    }
}
exports.FileDb = FileDb;
