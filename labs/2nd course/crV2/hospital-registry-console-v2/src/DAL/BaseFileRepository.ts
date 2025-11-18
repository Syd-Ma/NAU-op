import { FileDb } from "./FileDb";
import { ID } from "../BLL/types/ID";

export abstract class BaseFileRepository<T extends { id: ID }> {
    protected readonly db: FileDb;
    protected readonly collection: string;

    protected constructor(db: FileDb, collection: string) {
        this.db = db;
        this.collection = collection;
    }

    protected async loadAll(): Promise<T[]> {
        return this.db.read<T>(this.collection);
    }

    protected async saveAll(all: T[]): Promise<void> {
        await this.db.write<T>(this.collection, all);
    }

    async add(entity: T): Promise<void> {
        const all = await this.loadAll();
        all.push(entity);
        await this.saveAll(all);
    }

    async update(entity: T): Promise<void> {
        const all = await this.loadAll();
        const index = all.findIndex(x => x.id === entity.id);
        if (index >= 0) {
            all[index] = entity;
            await this.saveAll(all);
        }
    }

    async remove(id: ID): Promise<void> {
        const all = await this.loadAll();
        await this.saveAll(all.filter(x => x.id !== id));
    }

    async getById(id: ID): Promise<T | undefined> {
        const all = await this.loadAll();
        return all.find(x => x.id === id);
    }

    async list(): Promise<T[]> {
        return this.loadAll();
    }
}
