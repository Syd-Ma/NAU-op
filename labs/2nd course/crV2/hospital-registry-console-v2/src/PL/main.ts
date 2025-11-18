import { FileDb } from "../DAL/FileDb";
import { DoctorFileRepository } from "../DAL/DoctorFileRepository";
import { PatientFileRepository } from "../DAL/PatientFileRepository";
import { ScheduleFileRepository } from "../DAL/ScheduleFileRepository";
import { AppointmentFileRepository } from "../DAL/AppointmentFileRepository";
import { DoctorService } from "../BLL/services/DoctorService";
import { PatientService } from "../BLL/services/PatientService";
import { ScheduleService } from "../BLL/services/ScheduleService";
import { AppointmentService } from "../BLL/services/AppointmentService";
import { ConsoleMenu } from "./menu";

async function main() {
    const db = new FileDb("./data");

    const doctorRepo = new DoctorFileRepository(db);
    const patientRepo = new PatientFileRepository(db);
    const scheduleRepo = new ScheduleFileRepository(db);
    const appointmentRepo = new AppointmentFileRepository(db);

    const doctorService = new DoctorService(doctorRepo);
    const patientService = new PatientService(patientRepo);
    const scheduleService = new ScheduleService(scheduleRepo, doctorRepo);
    const appointmentService = new AppointmentService(
        appointmentRepo,
        scheduleRepo,
        doctorRepo,
        patientRepo
    );

    const menu = new ConsoleMenu(doctorService, patientService, scheduleService, appointmentService);
    await menu.run();
}

main().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});
