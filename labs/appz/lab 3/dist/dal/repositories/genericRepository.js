export class GenericRepository {
    collectionProvider;
    constructor(collectionProvider) {
        this.collectionProvider = collectionProvider;
    }
    async getAll() {
        return [...this.collectionProvider()];
    }
    async getById(id) {
        return this.collectionProvider().find((entity) => entity.id === id);
    }
    async add(entity) {
        this.collectionProvider().push(entity);
    }
    async update(entity) {
        const collection = this.collectionProvider();
        const index = collection.findIndex((item) => item.id === entity.id);
        if (index < 0) {
            throw new Error(`Entity with id ${entity.id} was not found.`);
        }
        collection[index] = entity;
    }
    async remove(id) {
        const collection = this.collectionProvider();
        const index = collection.findIndex((entity) => entity.id === id);
        if (index < 0) {
            return false;
        }
        collection.splice(index, 1);
        return true;
    }
}
