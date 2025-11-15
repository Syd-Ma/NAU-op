export class InMemoryDoctorRepo {
    private items: any[] = [];

    async getAll() {
        return this.items;
    }

    async save(list: any[]) {
        this.items = list;
    }

    async add(item: any) {
        this.items.push(item);
    }

    async findByNameOrSpec(query: string) {
        const q = query.toLowerCase();
        return this.items.filter(d => {
            const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
            const spec = (d.specialization ?? "").toLowerCase();
            return fullName.includes(q) || spec.includes(q);
        });
    }
}
