"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityContext = void 0;
class EntityContext {
    constructor(provider) {
        this.provider = provider;
    }
    async load() {
        return await this.provider.load();
    }
    async save(data) {
        await this.provider.save(data);
    }
}
exports.EntityContext = EntityContext;
