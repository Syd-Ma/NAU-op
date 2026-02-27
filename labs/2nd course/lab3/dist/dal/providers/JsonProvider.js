"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonProvider = void 0;
const fs_1 = require("fs");
const DataProvider_js_1 = require("./DataProvider.js");
class JsonProvider extends DataProvider_js_1.DataProvider {
    async save(data) {
        await fs_1.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    }
    async load() {
        try {
            const text = await fs_1.promises.readFile(this.filePath, 'utf8');
            return JSON.parse(text);
        }
        catch {
            return [];
        }
    }
}
exports.JsonProvider = JsonProvider;
