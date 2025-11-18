import readline from "readline";
import { DoctorService } from "../BLL/services/DoctorService";
import { PatientService } from "../BLL/services/PatientService";
import { ScheduleService } from "../BLL/services/ScheduleService";
import { AppointmentService } from "../BLL/services/AppointmentService";
import { requireNonEmpty, requirePhone, requireDateTime } from "../utils/inputValidation";
import { DomainError } from "../BLL/errors/DomainError";

export class ConsoleMenu {
    private readonly rl: readline.Interface;
    private readonly doctorService: DoctorService;
    private readonly patientService: PatientService;
    private readonly scheduleService: ScheduleService;
    private readonly appointmentService: AppointmentService;

    constructor(
        doctorService: DoctorService,
        patientService: PatientService,
        scheduleService: ScheduleService,
        appointmentService: AppointmentService
    ) {
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.scheduleService = scheduleService;
        this.appointmentService = appointmentService;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    private ask(question: string): Promise<string> {
        return new Promise(resolve => this.rl.question(question, answer => resolve(answer)));
    }

    async run(): Promise<void> {
        let exit = false;

        while (!exit) {
            console.log("\n=== Hospital Registry ===");
            console.log("1. Додати лікаря");
            console.log("2. Додати пацієнта");
            console.log("3. Створити слот розкладу");
            console.log("4. Записати пацієнта на прийом");
            console.log("0. Вихід");

            const choice = (await this.ask("> ")).trim();

            try {
                switch (choice) {
                    case "1":
                        await this.addDoctor();
                        break;
                    case "2":
                        await this.addPatient();
                        break;
                    case "3":
                        await this.addSlot();
                        break;
                    case "4":
                        await this.addAppointment();
                        break;
                    case "0":
                        exit = true;
                        break;
                    default:
                        console.log("Невідома команда");
                }
            } catch (err) {
                if (err instanceof DomainError || err instanceof Error) {
                    console.log("Помилка:", err.message);
                } else {
                    console.log("Невідома помилка");
                }
            }
        }

        this.rl.close();
    }

    private async addDoctor(): Promise<void> {
        const firstName = requireNonEmpty(await this.ask("Ім'я: "), "Ім'я");
        const lastName = requireNonEmpty(await this.ask("Прізвище: "), "Прізвище");
        const spec = requireNonEmpty(await this.ask("Спеціалізація: "), "Спеціалізація");

        const doctor = await this.doctorService.registerDoctor(firstName, lastName, spec);
        console.log("Створено лікаря:", doctor.fullName, "ID:", doctor.id);
    }

    private async addPatient(): Promise<void> {
        const firstName = requireNonEmpty(await this.ask("Ім'я: "), "Ім'я");
        const lastName = requireNonEmpty(await this.ask("Прізвище: "), "Прізвище");
        const phone = requirePhone(await this.ask("Телефон: "));

        const patient = await this.patientService.registerPatient(firstName, lastName, phone);
        console.log("Створено пацієнта:", patient.fullName, "ID:", patient.id);
    }

    private async addSlot(): Promise<void> {
        const doctorId = requireNonEmpty(await this.ask("ID лікаря: "), "ID лікаря");
        const startIso = requireDateTime(await this.ask("Початок (ISO): "));
        const endIso = requireDateTime(await this.ask("Кінець (ISO): "));

        const slot = await this.scheduleService.createSlot(doctorId, startIso, endIso);
        console.log("Створено слот:", slot.id);
    }

    private async addAppointment(): Promise<void> {
        const doctorId = requireNonEmpty(await this.ask("ID лікаря: "), "ID лікаря");
        const patientId = requireNonEmpty(await this.ask("ID пацієнта: "), "ID пацієнта");
        const slotId = requireNonEmpty(await this.ask("ID слоту: "), "ID слоту");

        const appointment = await this.appointmentService.createAppointment(doctorId, patientId, slotId);
        console.log("Створено запис:", appointment.id);
    }
}
