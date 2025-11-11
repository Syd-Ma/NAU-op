"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = exports.ScheduleService = exports.PatientService = exports.DoctorService = void 0;
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const entities_1 = require("../domain/entities");
const errors_1 = require("../domain/errors");
const dateRangeSchema = zod_1.z.object({ start: zod_1.z.string(), end: zod_1.z.string() })
    .refine(v => new Date(v.start) < new Date(v.end), "Початок має бути раніше за кінець");
let DoctorService = (() => {
    let _classDecorators = [(0, tsyringe_1.injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DoctorService = _classThis = class {
        constructor(repo) {
            this.repo = repo;
        }
        async add(input) {
            const candidate = { id: (0, uuid_1.v4)(), ...input };
            const parsed = entities_1.DoctorSchema.safeParse(candidate);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            const dupes = await this.repo.findByNameOrSpec(`${input.firstName} ${input.lastName}`);
            if (dupes.some(d => d.firstName === input.firstName && d.lastName === input.lastName && d.specialization === input.specialization)) {
                throw new errors_1.DuplicateError("Такий лікар (ПІБ + спеціалізація) вже існує");
            }
            await this.repo.add(candidate);
            return candidate;
        }
        async update(d) {
            const parsed = entities_1.DoctorSchema.safeParse(d);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            const existing = await this.repo.getById(d.id);
            if (!existing)
                throw new errors_1.NotFoundError("Лікаря не знайдено");
            await this.repo.update(d);
            return d;
        }
        async remove(id) {
            const existing = await this.repo.getById(id);
            if (!existing)
                throw new errors_1.NotFoundError("Лікаря не знайдено");
            await this.repo.remove(id);
        }
        async list() { return this.repo.list(); }
        async search(q) { return this.repo.findByNameOrSpec(q); }
    };
    __setFunctionName(_classThis, "DoctorService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DoctorService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DoctorService = _classThis;
})();
exports.DoctorService = DoctorService;
let PatientService = (() => {
    let _classDecorators = [(0, tsyringe_1.injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PatientService = _classThis = class {
        constructor(repo) {
            this.repo = repo;
        }
        async add(input) {
            const candidate = { id: (0, uuid_1.v4)(), cardNotes: [], ...input };
            const parsed = entities_1.PatientSchema.safeParse(candidate);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            await this.repo.add(candidate);
            return candidate;
        }
        async update(p) {
            const parsed = entities_1.PatientSchema.safeParse(p);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            const existing = await this.repo.getById(p.id);
            if (!existing)
                throw new errors_1.NotFoundError("Пацієнта не знайдено");
            await this.repo.update(p);
            return p;
        }
        async remove(id) {
            const existing = await this.repo.getById(id);
            if (!existing)
                throw new errors_1.NotFoundError("Пацієнта не знайдено");
            await this.repo.remove(id);
        }
        async list() { return this.repo.list(); }
        async search(q) { return this.repo.findByName(q); }
        async addNote(patientId, note) {
            const p = await this.repo.getById(patientId);
            if (!p)
                throw new errors_1.NotFoundError("Пацієнта не знайдено");
            p.cardNotes.push({ at: new Date().toISOString(), note });
            await this.repo.update(p);
            return p;
        }
    };
    __setFunctionName(_classThis, "PatientService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PatientService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PatientService = _classThis;
})();
exports.PatientService = PatientService;
let ScheduleService = (() => {
    let _classDecorators = [(0, tsyringe_1.injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ScheduleService = _classThis = class {
        constructor(schedules, doctors) {
            this.schedules = schedules;
            this.doctors = doctors;
        }
        async addSlot(input) {
            const parsed = entities_1.ScheduleSlotSchema.omit({ id: true }).and(dateRangeSchema).safeParse(input);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            const doc = await this.doctors.getById(input.doctorId);
            if (!doc)
                throw new errors_1.NotFoundError("Лікаря не знайдено");
            const slot = { id: (0, uuid_1.v4)(), ...input };
            await this.schedules.addSlot(slot);
            return slot;
        }
        async updateSlot(s) {
            const parsed = entities_1.ScheduleSlotSchema.safeParse(s);
            if (!parsed.success)
                throw new errors_1.ValidationError(parsed.error.message);
            const existing = await this.schedules.getSlotById(s.id);
            if (!existing)
                throw new errors_1.NotFoundError("Слот не знайдено");
            await this.schedules.updateSlot(s);
            return s;
        }
        async removeSlot(id) { await this.schedules.removeSlot(id); }
        async listByDoctor(doctorId) { return this.schedules.listSlotsByDoctor(doctorId); }
    };
    __setFunctionName(_classThis, "ScheduleService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScheduleService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScheduleService = _classThis;
})();
exports.ScheduleService = ScheduleService;
let AppointmentService = (() => {
    let _classDecorators = [(0, tsyringe_1.injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppointmentService = _classThis = class {
        constructor(appts, schedules, patients, doctors) {
            this.appts = appts;
            this.schedules = schedules;
            this.patients = patients;
            this.doctors = doctors;
        }
        async book(doctorId, patientId, slotId) {
            const [doc, pat, slot] = await Promise.all([
                this.doctors.getById(doctorId),
                this.patients.getById(patientId),
                this.schedules.getSlotById(slotId)
            ]);
            if (!doc)
                throw new errors_1.NotFoundError("Лікаря не знайдено");
            if (!pat)
                throw new errors_1.NotFoundError("Пацієнта не знайдено");
            if (!slot || slot.doctorId !== doctorId)
                throw new errors_1.SlotUnavailableError("Слот недоступний для цього лікаря");
            const current = await this.appts.listBySlot(slotId);
            if (current.length >= (slot.capacity ?? 1))
                throw new errors_1.OverbookingError("Перевищено місткість слота");
            const a = { id: (0, uuid_1.v4)(), doctorId, patientId, slotId, createdAt: new Date().toISOString() };
            await this.appts.add(a);
            return a;
        }
        async cancel(appointmentId) { await this.appts.remove(appointmentId); }
        async listByDoctor(doctorId) { return this.appts.listByDoctor(doctorId); }
        async listByPatient(patientId) { return this.appts.listByPatient(patientId); }
    };
    __setFunctionName(_classThis, "AppointmentService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentService = _classThis;
})();
exports.AppointmentService = AppointmentService;
