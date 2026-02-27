"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomProvider = void 0;
const fs_1 = require("fs");
const DataProvider_js_1 = require("./DataProvider.js");
class CustomProvider extends DataProvider_js_1.DataProvider {
    async save(data) {
        const lines = data.map(o => Object.values(o).join(';')).join('\n');
        await fs_1.promises.writeFile(this.filePath, lines, 'utf8');
    }
    async load() {
        try {
            const text = await fs_1.promises.readFile(this.filePath, 'utf8');
            const lines = text.trim().split('\n');
            const result = lines.map(l => {
                const [id, lastName, firstName, gender, course, grade] = l.split(';');
                return { id, lastName, firstName, gender, course: +course, grade: +grade };
            });
            return result;
        }
        catch {
            return [];
        }
    }
}
exports.CustomProvider = CustomProvider;
