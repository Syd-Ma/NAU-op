"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHelper = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
class InputHelper {
    static async ask(message) {
        const { answer } = await inquirer_1.default.prompt({ type: 'input', name: 'answer', message });
        return answer;
    }
}
exports.InputHelper = InputHelper;
