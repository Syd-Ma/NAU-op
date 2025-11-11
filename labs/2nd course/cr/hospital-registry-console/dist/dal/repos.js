"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDb = exports.AppointmentFileRepo = exports.ScheduleFileRepo = exports.PatientFileRepo = exports.DoctorFileRepo = void 0;
const fileDb_1 = require("./fileDb");
Object.defineProperty(exports, "FileDb", { enumerable: true, get: function () { return fileDb_1.FileDb; } });
class DoctorFileRepo {
    constructor(db) {
        this.db = db;
    }
    async add(d) {
        const all = await this.db.read("doctors");
        all.push(d);
        await this.db.write("doctors", all);
    }
    async update(d) {
        const all = await this.db.read("doctors");
        const i = all.findIndex(x => x.id === d.id);
        if (i >= 0) {
            all[i] = d;
            await this.db.write("doctors", all);
        }
    }
    async remove(id) {
        const all = await this.db.read("doctors");
        await this.db.write("doctors", all.filter(x => x.id !== id));
    }
    async getById(id) {
        const all = await this.db.read("doctors");
        return all.find(x => x.id === id);
    }
    async list() { return this.db.read("doctors"); }
    async findByNameOrSpec(q) {
        const s = q.toLowerCase();
        const all = await this.db.read("doctors");
        return all.filter(x => `${x.firstName} ${x.lastName}`.toLowerCase().includes(s) ||
            x.specialization.toLowerCase().includes(s));
    }
}
exports.DoctorFileRepo = DoctorFileRepo;
class PatientFileRepo {
    constructor(db) {
        this.db = db;
    }
    async add(p) {
        const all = await this.db.read("patients");
        all.push(p);
        await this.db.write("patients", all);
    }
    async update(p) {
        const all = await this.db.read("patients");
        const i = all.findIndex(x => x.id === p.id);
        if (i >= 0) {
            all[i] = p;
            await this.db.write("patients", all);
        }
    }
    async remove(id) {
        const all = await this.db.read("patients");
        await this.db.write("patients", all.filter(x => x.id !== id));
    }
    async getById(id) {
        const all = await this.db.read("patients");
        return all.find(x => x.id === id);
    }
    async list() { return this.db.read("patients"); }
    async findByName(q) {
        const s = q.toLowerCase();
        const all = await this.db.read("patients");
        return all.filter(x => `${x.firstName} ${x.lastName}`.toLowerCase().includes(s));
    }
}
exports.PatientFileRepo = PatientFileRepo;
class ScheduleFileRepo {
    constructor(db) {
        this.db = db;
    }
    async addSlot(s) {
        const all = await this.db.read("slots");
        all.push(s);
        await this.db.write("slots", all);
    }
    async updateSlot(s) {
        const all = await this.db.read("slots");
        const i = all.findIndex(x => x.id === s.id);
        if (i >= 0) {
            all[i] = s;
            await this.db.write("slots", all);
        }
    }
    async removeSlot(id) {
        const all = await this.db.read("slots");
        await this.db.write("slots", all.filter(x => x.id !== id));
    }
    async getSlotById(id) {
        const all = await this.db.read("slots");
        return all.find(x => x.id === id);
    }
    async listSlotsByDoctor(doctorId) {
        const all = await this.db.read("slots");
        return all.filter(x => x.doctorId === doctorId);
    }
}
exports.ScheduleFileRepo = ScheduleFileRepo;
class AppointmentFileRepo {
    constructor(db) {
        this.db = db;
    }
    async add(a) {
        const all = await this.db.read("appointments");
        all.push(a);
        await this.db.write("appointments", all);
    }
    async remove(id) {
        const all = await this.db.read("appointments");
        await this.db.write("appointments", all.filter(x => x.id !== id));
    }
    async listBySlot(slotId) {
        const all = await this.db.read("appointments");
        return all.filter(x => x.slotId === slotId);
    }
    async listByDoctor(doctorId) {
        const all = await this.db.read("appointments");
        return all.filter(x => x.doctorId === doctorId);
    }
    async listByPatient(patientId) {
        const all = await this.db.read("appointments");
        return all.filter(x => x.patientId === patientId);
    }
}
exports.AppointmentFileRepo = AppointmentFileRepo;
