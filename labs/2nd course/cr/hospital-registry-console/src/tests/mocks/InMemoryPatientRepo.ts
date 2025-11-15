export class InMemoryPatientRepo {
    private items: any[] = [];

    async add(item: any) {
        this.items.push(item);
    }

    async list() {
        return this.items;
    }

    async getById(id: string) {
        return this.items.find(p => p.id === id) ?? null;
    }

    async update(updated: any) {
        const idx = this.items.findIndex(p => p.id === updated.id);
        if (idx === -1) return null;
        this.items[idx] = updated;
        return updated;
    }

    async remove(id: string) {
        this.items = this.items.filter(p => p.id !== id);
    }

    async findByName(query: string) {
        const q = query.toLowerCase();
        return this.items.filter(p => {
            const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
            return fullName.includes(q);
        });
    }
}
