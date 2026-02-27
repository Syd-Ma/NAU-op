"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryProvider = void 0;
const fs_1 = require("fs");
const DataProvider_js_1 = require("./DataProvider.js");
class BinaryProvider extends DataProvider_js_1.DataProvider {
    async save(data) {
        const buffer = Buffer.from(JSON.stringify(data), 'utf8');
        await fs_1.promises.writeFile(this.filePath, buffer);
    }
    async load() {
        try {
            const buffer = await fs_1.promises.readFile(this.filePath);
            return JSON.parse(buffer.toString('utf8'));
        }
        catch {
            return [];
        }
    }
}
exports.BinaryProvider = BinaryProvider;
