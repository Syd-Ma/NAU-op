import * as readline from "readline";
import { Student } from "./models/Student";
import { Dentist } from "./models/Dentist";
import { Storyteller } from "./models/Storyteller";
import { FileService } from "./FileService";

const DEFAULT_FILE = "data.txt";

function questionPromise(rl: readline.Interface, q: string): Promise<string> {
    return new Promise(res => rl.question(q, ans => res(ans.trim())));
}

function normalizeGender(input: string): string {
    const s = input.trim().toLowerCase();
    if (["f", "female", "ж", "жінка", "жiнка", "жін.", "j"].includes(s)) return "female";
    if (["m", "male", "ч", "чоловік", "чоловіча", "чол"].includes(s)) return "male";
    return s;
}

export class ConsoleMenu {
    private rl: readline.Interface;
    private entities: (Student | Dentist | Storyteller)[] = [];

    constructor() {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    }

    async run(): Promise<void> {
        console.log("=== University App (console) ===");
        let exit = false;
        while (!exit) {
            console.log("\nMenu:");
            console.log("1) Add Student");
            console.log("2) Add Dentist");
            console.log("3) Add Storyteller");
            console.log("4) Save to file (data.txt)");
            console.log("5) Load from file (data.txt)");
            console.log("6) Show all entities");
            console.log("7) Count female excellent students (5th course) — show NUMBER");
            console.log("8) Call abilities for all entities");
            console.log("9) Exit");
            const choice = await questionPromise(this.rl, "> ");

            switch (choice) {
                case "1":
                    await this.addStudentFlow();
                    break;
                case "2":
                    await this.addDentistFlow();
                    break;
                case "3":
                    await this.addStorytellerFlow();
                    break;
                case "4":
                    FileService.saveEntities(DEFAULT_FILE, this.entities);
                    console.log(`Saved ${this.entities.length} entities to ${DEFAULT_FILE}`);
                    break;
                case "5":
                    this.entities = FileService.loadEntities(DEFAULT_FILE);
                    console.log(`Loaded ${this.entities.length} entities from ${DEFAULT_FILE}`);
                    break;
                case "6":
                    this.showAll();
                    break;
                case "7":
                    this.showExcellentCount();
                    break;
                case "8":
                    this.callAbilities();
                    break;
                case "9":
                    exit = true;
                    break;
                default:
                    console.log("Unknown choice — try again.");
            }
        }

        this.rl.close();
        console.log("Bye");
    }

    private async addStudentFlow(): Promise<void> {
        const firstName = await questionPromise(this.rl, "First name: ");
        const lastName = await questionPromise(this.rl, "Last name: ");
        const id = await questionPromise(this.rl, "ID (any unique code): ");
        const studentId = await questionPromise(this.rl, "Student card (e.g. KB123456): ");
        const courseStr = await questionPromise(this.rl, "Course (number): ");
        const course = Number(courseStr) || 0;
        const genderRaw = await questionPromise(this.rl, "Gender (male/female or M/F or Ж/Ч): ");
        const gender = normalizeGender(genderRaw);
        const gradeStr = await questionPromise(this.rl, "Average grade (0-100): ");
        const grade = Number(gradeStr) || 0;

        const s = new Student(firstName, lastName, id, studentId, course, gender, grade);
        this.entities.push(s);
        console.log("Student added.");
    }

    private async addDentistFlow(): Promise<void> {
        const firstName = await questionPromise(this.rl, "First name: ");
        const lastName = await questionPromise(this.rl, "Last name: ");
        const id = await questionPromise(this.rl, "ID: ");
        const clinicName = await questionPromise(this.rl, "Clinic name (optional): ");
        const d = new Dentist(firstName, lastName, id, clinicName);
        this.entities.push(d);
        console.log("Dentist added.");
    }

    private async addStorytellerFlow(): Promise<void> {
        const firstName = await questionPromise(this.rl, "First name: ");
        const lastName = await questionPromise(this.rl, "Last name: ");
        const id = await questionPromise(this.rl, "ID: ");
        const genre = await questionPromise(this.rl, "Favorite genre (optional): ");
        const st = new Storyteller(firstName, lastName, id, genre || "folk");
        this.entities.push(st);
        console.log("Storyteller added.");
    }

    private showAll(): void {
        if (this.entities.length === 0) {
            console.log("No entities in memory. Load file or add new ones.");
            return;
        }
        console.log("\n---- All entities ----");
        this.entities.forEach((e, idx) => {
            const type = e.constructor.name;
            console.log(`\n#${idx + 1} Type: ${type}`);
            console.log(JSON.stringify(e, null, 2));
        });
        console.log("\n----------------------");
    }

    private showExcellentCount(): void {
        const count = this.entities.filter(e => e instanceof Student && e.isExcellentFiveCourse()).length;
        console.log(`Кількість відмінниць 5 курсу: ${count}`);
    }

    private callAbilities(): void {
        if (this.entities.length === 0) {
            console.log("No entities to call abilities on.");
            return;
        }
        console.log("\nCalling abilities for all entities:");
        this.entities.forEach(e => {
            e.ability();
        });
    }
}
