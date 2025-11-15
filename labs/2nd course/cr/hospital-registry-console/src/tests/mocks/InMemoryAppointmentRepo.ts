export class InMemoryAppointmentRepo {
    private items: any[] = [];

    async add(item: any) {
        this.items.push(item);
    }

    async remove(id: string) {
        this.items = this.items.filter(a => a.id !== id);
    }

    async listBySlot(slotId: string) {
        return this.items.filter(a => a.slotId === slotId);
    }

    async listByDoctor(doctorId: string) {
        return this.items.filter(a => a.doctorId === doctorId);
    }

    async listByPatient(patientId: string) {
        return this.items.filter(a => a.patientId === patientId);
    }
}
