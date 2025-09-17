import * as fs from "fs";
import * as path from "path";
import { Student } from "./models/Student";
import { Dentist } from "./models/Dentist";
import { Storyteller } from "./models/Storyteller";

const BLOCK_REGEX = /(\w+)\s+(\w+)\s*[\r\n]+(\{[\s\S]*?)\s*;/g;

export class FileService {
    static saveEntities(filename: string, entities: (Student | Dentist | Storyteller)[]): void {
        const abs = path.resolve(filename);
        const content = entities.map(e => {
            return e.toSaveBlock();
        }).join("\n");
        fs.writeFileSync(abs, content, { encoding: "utf-8" });
    }

    static loadEntities(filename: string): (Student | Dentist | Storyteller)[] {
        const abs = path.resolve(filename);
        if (!fs.existsSync(abs)) return [];
        const content = fs.readFileSync(abs, { encoding: "utf-8" });

        const entities: (Student | Dentist | Storyteller)[] = [];

        let match;
        while ((match = BLOCK_REGEX.exec(content)) !== null) {
            const type = match[1];
            const jsonStr = match[3];
            try {
                const obj = JSON.parse(jsonStr);
                if (type === "Student") {
                    entities.push(Student.fromObject(obj));
                } else if (type === "Dentist") {
                    entities.push(Dentist.fromObject(obj));
                } else if (type === "Storyteller") {
                    entities.push(Storyteller.fromObject(obj));
                } else {
                    console.warn(`Unknown type in file: ${type}`);
                }
            } catch (err) {
                console.error("Error parsing block JSON:", err);
            }
        }

        return entities;
    }
}
