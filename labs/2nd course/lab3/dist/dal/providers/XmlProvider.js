"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlProvider = void 0;
const fs_1 = require("fs");
const xml2js_1 = require("xml2js");
const DataProvider_js_1 = require("./DataProvider.js");
class XmlProvider extends DataProvider_js_1.DataProvider {
    async save(data) {
        const builder = new xml2js_1.Builder();
        const xml = builder.buildObject({ root: { item: data } });
        await fs_1.promises.writeFile(this.filePath, xml, 'utf8');
    }
    async load() {
        try {
            const xml = await fs_1.promises.readFile(this.filePath, 'utf8');
            const obj = await (0, xml2js_1.parseStringPromise)(xml);
            return obj.root?.item || [];
        }
        catch {
            return [];
        }
    }
}
exports.XmlProvider = XmlProvider;
