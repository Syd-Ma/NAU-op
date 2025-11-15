export class InMemoryScheduleRepo {
    private items: any[] = [];

    async addSlot(slot: any) {
        this.items.push(slot);
    }

    async getSlotById(id: string) {
        return this.items.find(s => s.id === id) ?? null;
    }

    async updateSlot(updated: any) {
        const idx = this.items.findIndex(s => s.id === updated.id);
        if (idx === -1) return null;
        this.items[idx] = updated;
        return updated;
    }

    async removeSlot(id: string) {
        this.items = this.items.filter(s => s.id !== id);
    }

    async listSlotsByDoctor(doctorId: string) {
        return this.items.filter(s => s.doctorId === doctorId);
    }
}
