"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMapper = void 0;
class StudentMapper {
    static toModel(entity) {
        return { ...entity };
    }
    static toEntity(model) {
        return { ...model };
    }
}
exports.StudentMapper = StudentMapper;
