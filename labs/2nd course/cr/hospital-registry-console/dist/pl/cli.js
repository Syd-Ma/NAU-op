#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fileDb_1 = require("../dal/fileDb");
const repos_1 = require("../dal/repos");
const container_1 = require("../bll/container");
const services_1 = require("../bll/services");
const errors_1 = require("../domain/errors");
/** ===== Ініціалізація шарів ===== */
const DATA_DIR = process.env.HR_DATA_DIR || "./data";
const db = new fileDb_1.FileDb(DATA_DIR);
(0, container_1.registerRepos)({
    doctorRepo: new repos_1.DoctorFileRepo(db),
    patientRepo: new repos_1.PatientFileRepo(db),
    scheduleRepo: new repos_1.ScheduleFileRepo(db),
    appointmentRepo: new repos_1.AppointmentFileRepo(db)
});
const doctorSvc = container_1.container.resolve(services_1.DoctorService);
const patientSvc = container_1.container.resolve(services_1.PatientService);
const scheduleSvc = container_1.container.resolve(services_1.ScheduleService);
const apptSvc = container_1.container.resolve(services_1.AppointmentService);
/** ===== Утиліти ===== */
function hr(msg = "") {
    console.log("\n" + "-".repeat(70));
    if (msg)
        console.log(msg);
}
async function pause() {
    await inquirer_1.default.prompt([{ name: "cont", type: "input", message: "Натисніть Enter, щоб продовжити..." }]);
}
function handleError(e) {
    const err = e;
    if (err instanceof errors_1.ValidationError)
        console.error("⛔ Помилка валідації:", err.message);
    else if (err instanceof errors_1.NotFoundError)
        console.error("⛔ Не знайдено:", err.message);
    else if (err instanceof errors_1.DuplicateError)
        console.error("⛔ Дублювання:", err.message);
    else if (err instanceof errors_1.SlotUnavailableError)
        console.error("⛔ Слот недоступний:", err.message);
    else if (err instanceof errors_1.OverbookingError)
        console.error("⛔ Перевищено місткість:", err.message);
    else if (err instanceof errors_1.DomainError)
        console.error("⛔ Бізнес-помилка:", err.message);
    else
        console.error("⛔ Несподівана помилка:", err.message);
}
/** ===== Підменю: Лікарі ===== */
async function menuDoctors() {
    while (true) {
        hr("👩‍⚕️ Лікарі");
        const { act } = await inquirer_1.default.prompt([{
                name: "act", type: "list", message: "Оберіть дію:",
                choices: [
                    { name: "Додати лікаря", value: "add" },
                    { name: "Змінити дані лікаря", value: "edit" },
                    { name: "Видалити лікаря", value: "remove" },
                    { name: "Список лікарів", value: "list" },
                    { name: "Пошук лікаря (ПІБ/спеціалізація)", value: "search" },
                    { name: "⬅ Назад", value: "back" }
                ]
            }]);
        if (act === "back")
            return;
        try {
            if (act === "add") {
                const ans = await inquirer_1.default.prompt([
                    { name: "firstName", message: "Імʼя:", validate: v => !!v || "Обовʼязково" },
                    { name: "lastName", message: "Прізвище:", validate: v => !!v || "Обовʼязково" },
                    { name: "specialization", message: "Спеціалізація:", validate: v => !!v || "Обовʼязково" },
                    { name: "phone", message: "Телефон (необовʼязково):" },
                    { name: "email", message: "Email (необовʼязково):" }
                ]);
                const d = await doctorSvc.add(ans);
                console.table([d]);
            }
            if (act === "edit") {
                const list = await doctorSvc.list();
                if (!list.length) {
                    console.log("Порожньо");
                    await pause();
                    continue;
                }
                const { id } = await inquirer_1.default.prompt([{
                        name: "id", type: "list", message: "Оберіть лікаря:",
                        choices: list.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const current = list.find(d => d.id === id);
                const upd = await inquirer_1.default.prompt([
                    { name: "firstName", message: "Імʼя:", default: current.firstName },
                    { name: "lastName", message: "Прізвище:", default: current.lastName },
                    { name: "specialization", message: "Спеціалізація:", default: current.specialization },
                    { name: "phone", message: "Телефон:", default: current.phone ?? "" },
                    { name: "email", message: "Email:", default: current.email ?? "" }
                ]);
                const saved = await doctorSvc.update({ ...current, ...upd });
                console.table([saved]);
            }
            if (act === "remove") {
                const list = await doctorSvc.list();
                if (!list.length) {
                    console.log("Порожньо");
                    await pause();
                    continue;
                }
                const { id } = await inquirer_1.default.prompt([{
                        name: "id", type: "list", message: "Кого видаляємо?",
                        choices: list.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                await doctorSvc.remove(id);
                console.log("✅ Видалено");
            }
            if (act === "list") {
                console.table(await doctorSvc.list());
            }
            if (act === "search") {
                const { q } = await inquirer_1.default.prompt([{ name: "q", message: "Запит:" }]);
                console.table(await doctorSvc.search(q));
            }
        }
        catch (e) {
            handleError(e);
        }
        await pause();
    }
}
/** ===== Підменю: Пацієнти ===== */
async function menuPatients() {
    while (true) {
        hr("🧑‍🦽 Пацієнти");
        const { act } = await inquirer_1.default.prompt([{
                name: "act", type: "list", message: "Оберіть дію:",
                choices: [
                    { name: "Додати пацієнта", value: "add" },
                    { name: "Змінити дані пацієнта", value: "edit" },
                    { name: "Видалити пацієнта", value: "remove" },
                    { name: "Список пацієнтів", value: "list" },
                    { name: "Пошук пацієнта (ПІБ)", value: "search" },
                    { name: "Додати нотатку до картки", value: "note" },
                    { name: "⬅ Назад", value: "back" }
                ]
            }]);
        if (act === "back")
            return;
        try {
            if (act === "add") {
                const ans = await inquirer_1.default.prompt([
                    { name: "firstName", message: "Імʼя:", validate: v => !!v || "Обовʼязково" },
                    { name: "lastName", message: "Прізвище:", validate: v => !!v || "Обовʼязково" },
                    { name: "phone", message: "Телефон (необовʼязково):" },
                    { name: "email", message: "Email (необовʼязково):" },
                    { name: "birthDate", message: "Дата народження (YYYY-MM-DD, необовʼязково):" }
                ]);
                const p = await patientSvc.add(ans);
                console.table([p]);
            }
            if (act === "edit") {
                const list = await patientSvc.list();
                if (!list.length) {
                    console.log("Порожньо");
                    await pause();
                    continue;
                }
                const { id } = await inquirer_1.default.prompt([{
                        name: "id", type: "list", message: "Оберіть пацієнта:",
                        choices: list.map(p => ({ name: `${p.lastName} ${p.firstName}`, value: p.id }))
                    }]);
                const current = list.find(p => p.id === id);
                const upd = await inquirer_1.default.prompt([
                    { name: "firstName", message: "Імʼя:", default: current.firstName },
                    { name: "lastName", message: "Прізвище:", default: current.lastName },
                    { name: "phone", message: "Телефон:", default: current.phone ?? "" },
                    { name: "email", message: "Email:", default: current.email ?? "" },
                    { name: "birthDate", message: "Дата народження (YYYY-MM-DD):", default: current.birthDate ?? "" }
                ]);
                const saved = await patientSvc.update({ ...current, ...upd });
                console.table([saved]);
            }
            if (act === "remove") {
                const list = await patientSvc.list();
                if (!list.length) {
                    console.log("Порожньо");
                    await pause();
                    continue;
                }
                const { id } = await inquirer_1.default.prompt([{
                        name: "id", type: "list", message: "Кого видаляємо?",
                        choices: list.map(p => ({ name: `${p.lastName} ${p.firstName}`, value: p.id }))
                    }]);
                await patientSvc.remove(id);
                console.log("✅ Видалено");
            }
            if (act === "list") {
                console.table(await patientSvc.list());
            }
            if (act === "search") {
                const { q } = await inquirer_1.default.prompt([{ name: "q", message: "Запит:" }]);
                console.table(await patientSvc.search(q));
            }
            if (act === "note") {
                const list = await patientSvc.list();
                if (!list.length) {
                    console.log("Порожньо");
                    await pause();
                    continue;
                }
                const { id } = await inquirer_1.default.prompt([{
                        name: "id", type: "list", message: "Кому додати нотатку?",
                        choices: list.map(p => ({ name: `${p.lastName} ${p.firstName}`, value: p.id }))
                    }]);
                const { note } = await inquirer_1.default.prompt([{ name: "note", message: "Текст нотатки:", validate: v => !!v || "Обовʼязково" }]);
                const updated = await patientSvc.addNote(id, note);
                console.log("Нотатку додано. Останні записи картки:");
                console.table(updated.cardNotes.slice(-5));
            }
        }
        catch (e) {
            handleError(e);
        }
        await pause();
    }
}
/** ===== Підменю: Розклад ===== */
async function menuSchedule() {
    while (true) {
        hr("📅 Розклад");
        const { act } = await inquirer_1.default.prompt([{
                name: "act", type: "list", message: "Оберіть дію:",
                choices: [
                    { name: "Додати слот прийому", value: "add" },
                    { name: "Змінити слот", value: "edit" },
                    { name: "Видалити слот", value: "remove" },
                    { name: "Показати розклад лікаря", value: "list" },
                    { name: "⬅ Назад", value: "back" }
                ]
            }]);
        if (act === "back")
            return;
        try {
            if (act === "add") {
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Спочатку додайте лікаря");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const ans = await inquirer_1.default.prompt([
                    { name: "start", message: "Початок (ISO):", validate: v => !!v || "Обовʼязково" },
                    { name: "end", message: "Кінець (ISO):", validate: v => !!v || "Обовʼязково" },
                    { name: "capacity", message: "Місткість (1..):", default: "1" }
                ]);
                const slot = await scheduleSvc.addSlot({ doctorId, start: ans.start, end: ans.end, capacity: parseInt(ans.capacity, 10) || 1 });
                console.table([slot]);
            }
            if (act === "edit") {
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Немає лікарів");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const slots = await scheduleSvc.listByDoctor(doctorId);
                if (!slots.length) {
                    console.log("У цього лікаря поки немає слотів");
                    await pause();
                    continue;
                }
                const { slotId } = await inquirer_1.default.prompt([{
                        name: "slotId", type: "list", message: "Слот:",
                        choices: slots.map(s => ({ name: `${s.start} → ${s.end} [cap=${s.capacity}]`, value: s.id }))
                    }]);
                const current = slots.find(s => s.id === slotId);
                const upd = await inquirer_1.default.prompt([
                    { name: "start", message: "Початок (ISO):", default: current.start },
                    { name: "end", message: "Кінець (ISO):", default: current.end },
                    { name: "capacity", message: "Місткість:", default: String(current.capacity ?? 1) }
                ]);
                const saved = await scheduleSvc.updateSlot({ ...current, start: upd.start, end: upd.end, capacity: parseInt(upd.capacity, 10) || 1 });
                console.table([saved]);
            }
            if (act === "remove") {
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Немає лікарів");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const slots = await scheduleSvc.listByDoctor(doctorId);
                if (!slots.length) {
                    console.log("Немає слотів");
                    await pause();
                    continue;
                }
                const { slotId } = await inquirer_1.default.prompt([{
                        name: "slotId", type: "list", message: "Слот:",
                        choices: slots.map(s => ({ name: `${s.start} → ${s.end} [cap=${s.capacity}]`, value: s.id }))
                    }]);
                await scheduleSvc.removeSlot(slotId);
                console.log("✅ Видалено");
            }
            if (act === "list") {
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Немає лікарів");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                console.table(await scheduleSvc.listByDoctor(doctorId));
            }
        }
        catch (e) {
            handleError(e);
        }
        await pause();
    }
}
/** ===== Підменю: Запис до лікаря ===== */
async function menuAppointments() {
    while (true) {
        hr("📌 Записи на прийом");
        const { act } = await inquirer_1.default.prompt([{
                name: "act", type: "list", message: "Оберіть дію:",
                choices: [
                    { name: "Записати пацієнта", value: "book" },
                    { name: "Список записів за лікарем", value: "byDoctor" },
                    { name: "Список записів за пацієнтом", value: "byPatient" },
                    { name: "Скасувати запис", value: "cancel" },
                    { name: "⬅ Назад", value: "back" }
                ]
            }]);
        if (act === "back")
            return;
        try {
            if (act === "book") {
                const docs = await doctorSvc.list();
                const pats = await patientSvc.list();
                if (!docs.length || !pats.length) {
                    console.log("Додайте спершу лікаря і пацієнта");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const slots = await scheduleSvc.listByDoctor(doctorId);
                if (!slots.length) {
                    console.log("У лікаря немає доступних слотів");
                    await pause();
                    continue;
                }
                const { slotId } = await inquirer_1.default.prompt([{
                        name: "slotId", type: "list", message: "Слот:",
                        choices: slots.map(s => ({ name: `${s.start} → ${s.end} [cap=${s.capacity}]`, value: s.id }))
                    }]);
                const { patientId } = await inquirer_1.default.prompt([{
                        name: "patientId", type: "list", message: "Пацієнт:",
                        choices: pats.map(p => ({ name: `${p.lastName} ${p.firstName}`, value: p.id }))
                    }]);
                const a = await apptSvc.book(doctorId, patientId, slotId);
                console.table([a]);
            }
            if (act === "byDoctor") {
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Немає лікарів");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                console.table(await apptSvc.listByDoctor(doctorId));
            }
            if (act === "byPatient") {
                const pats = await patientSvc.list();
                if (!pats.length) {
                    console.log("Немає пацієнтів");
                    await pause();
                    continue;
                }
                const { patientId } = await inquirer_1.default.prompt([{
                        name: "patientId", type: "list", message: "Пацієнт:",
                        choices: pats.map(p => ({ name: `${p.lastName} ${p.firstName}`, value: p.id }))
                    }]);
                console.table(await apptSvc.listByPatient(patientId));
            }
            if (act === "cancel") {
                // простий шлях: вибрати лікаря → показати його записи → обрати для скасування
                const docs = await doctorSvc.list();
                if (!docs.length) {
                    console.log("Немає лікарів");
                    await pause();
                    continue;
                }
                const { doctorId } = await inquirer_1.default.prompt([{
                        name: "doctorId", type: "list", message: "Лікар:",
                        choices: docs.map(d => ({ name: `${d.lastName} ${d.firstName} — ${d.specialization}`, value: d.id }))
                    }]);
                const appts = await apptSvc.listByDoctor(doctorId);
                if (!appts.length) {
                    console.log("Немає записів");
                    await pause();
                    continue;
                }
                const { apptId } = await inquirer_1.default.prompt([{
                        name: "apptId", type: "list", message: "Який запис скасувати?",
                        choices: appts.map(a => ({ name: `${a.id} | slot=${a.slotId} | patient=${a.patientId} | ${a.createdAt}`, value: a.id }))
                    }]);
                await apptSvc.cancel(apptId);
                console.log("✅ Скасовано");
            }
        }
        catch (e) {
            handleError(e);
        }
        await pause();
    }
}
/** ===== Пошук ===== */
async function menuSearch() {
    while (true) {
        hr("🔎 Пошук");
        const { act } = await inquirer_1.default.prompt([{
                name: "act", type: "list", message: "Оберіть дію:",
                choices: [
                    { name: "Знайти пацієнта за ПІБ", value: "patient" },
                    { name: "Знайти лікаря за ПІБ/спеціалізацією", value: "doctor" },
                    { name: "⬅ Назад", value: "back" }
                ]
            }]);
        if (act === "back")
            return;
        try {
            if (act === "patient") {
                const { q } = await inquirer_1.default.prompt([{ name: "q", message: "ПІБ (частина):" }]);
                console.table(await patientSvc.search(q));
            }
            if (act === "doctor") {
                const { q } = await inquirer_1.default.prompt([{ name: "q", message: "ПІБ/спеціалізація (частина):" }]);
                console.table(await doctorSvc.search(q));
            }
        }
        catch (e) {
            handleError(e);
        }
        await pause();
    }
}
/** ===== Головне меню ===== */
async function mainMenu() {
    while (true) {
        hr("🏥 Реєстратура лікарні — консольний інтерфейс");
        const { section } = await inquirer_1.default.prompt([{
                name: "section",
                type: "list",
                message: "Куди переходимо?",
                choices: [
                    { name: "Лікарі", value: "doctors" },
                    { name: "Пацієнти", value: "patients" },
                    { name: "Розклад прийому", value: "schedule" },
                    { name: "Запис на прийом", value: "appt" },
                    { name: "Пошук", value: "search" },
                    { name: "Вихід", value: "exit" }
                ]
            }]);
        if (section === "exit") {
            console.log("👋 До зустрічі!");
            process.exit(0);
        }
        if (section === "doctors")
            await menuDoctors();
        if (section === "patients")
            await menuPatients();
        if (section === "schedule")
            await menuSchedule();
        if (section === "appt")
            await menuAppointments();
        if (section === "search")
            await menuSearch();
    }
}
mainMenu();
