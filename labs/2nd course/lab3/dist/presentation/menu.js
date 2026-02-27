"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const InputHelper_js_1 = require("./helpers/InputHelper.js");
const StudentService_js_1 = require("../bll/services/StudentService.js");
const EntityContext_js_1 = require("../dal/context/EntityContext.js");
const JsonProvider_js_1 = require("../dal/providers/JsonProvider.js");
const XmlProvider_js_1 = require("../dal/providers/XmlProvider.js");
const BinaryProvider_js_1 = require("../dal/providers/BinaryProvider.js");
const CustomProvider_js_1 = require("../dal/providers/CustomProvider.js");
class Menu {
    async start() {
        const { type } = await inquirer_1.default.prompt({
            type: 'list',
            name: 'type',
            message: 'Select serialization type',
            choices: ['JSON', 'XML', 'Binary', 'Custom']
        });
        const filePath = (await InputHelper_js_1.InputHelper.ask('Enter file path (наприклад, students.json):')) ||
            'students.json';
        let provider;
        if (type === 'JSON')
            provider = new JsonProvider_js_1.JsonProvider(filePath);
        if (type === 'XML')
            provider = new XmlProvider_js_1.XmlProvider(filePath);
        if (type === 'Binary')
            provider = new BinaryProvider_js_1.BinaryProvider(filePath);
        if (type === 'Custom')
            provider = new CustomProvider_js_1.CustomProvider(filePath);
        if (!provider) {
            console.log('Provider is undefined');
            return;
        }
        const context = new EntityContext_js_1.EntityContext(provider);
        const service = new StudentService_js_1.StudentService(context);
        await service.init();
        while (true) {
            const { action } = await inquirer_1.default.prompt({
                type: 'list',
                name: 'action',
                message: 'Виберіть дію',
                choices: [
                    'Додати студента',
                    'Показати всіх студентів',
                    'Показати відмінниць (5 курс)',
                    'Зберегти у файл',
                    'Вийти'
                ]
            });
            if (action === 'Додати студента') {
                const s = await inquirer_1.default.prompt([
                    { name: 'id', message: 'ID студента:' },
                    { name: 'lastName', message: 'Прізвище:' },
                    { name: 'firstName', message: 'Ім’я:' },
                    { type: 'list', name: 'gender', message: 'Стать:', choices: ['M', 'F'] },
                    { name: 'course', message: 'Курс (1–5):', default: 5 },
                    { name: 'grade', message: 'Середній бал (1–5):', default: 4.5 }
                ]);
                service.add({
                    id: s.id,
                    lastName: s.lastName,
                    firstName: s.firstName,
                    gender: s.gender,
                    course: Number(s.course),
                    grade: Number(s.grade)
                });
                console.log('Студента додано.');
            }
            if (action === 'Показати всіх студентів') {
                console.table(await service.getAll());
            }
            if (action === 'Показати відмінниць (5 курс)') {
                console.table(await service.getExcellentGirls());
            }
            if (action === 'Зберегти у файл') {
                await service.save();
                console.log(`Дані збережено у файл ${filePath}`);
            }
            if (action === 'Вийти') {
                console.log('Програму завершено.');
                break;
            }
        }
    }
}
exports.Menu = Menu;
