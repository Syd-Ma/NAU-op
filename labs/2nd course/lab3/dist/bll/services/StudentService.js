"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const StudentMapper_js_1 = require("../mappers/StudentMapper.js");
class StudentService {
    add(student) {
        this.students.push(student);
    }
    constructor(context) {
        this.context = context;
        this.students = [];
    }
    async init() {
        const entities = await this.context.load();
        this.students = entities.map(StudentMapper_js_1.StudentMapper.toModel);
    }
    async getAll() {
        return this.students;
    }
    async getExcellentGirls() {
        return this.students.filter(s => s.gender === 'F' && s.course === 5 && s.grade >= 4.5);
    }
    async save() {
        await this.context.save(this.students.map(StudentMapper_js_1.StudentMapper.toEntity));
    }
}
exports.StudentService = StudentService;
