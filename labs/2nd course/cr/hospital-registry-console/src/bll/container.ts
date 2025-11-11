import "reflect-metadata";
import { container } from "tsyringe";
import {
    IDoctorRepository, IPatientRepository, IScheduleRepository, IAppointmentRepository
} from "../domain/repositories";
import { DoctorService, PatientService, ScheduleService, AppointmentService } from "./services";

export function registerRepos(repos: {
    doctorRepo: IDoctorRepository,
    patientRepo: IPatientRepository,
    scheduleRepo: IScheduleRepository,
    appointmentRepo: IAppointmentRepository
}) {
    container.registerInstance<IDoctorRepository>("IDoctorRepository", repos.doctorRepo);
    container.registerInstance<IPatientRepository>("IPatientRepository", repos.patientRepo);
    container.registerInstance<IScheduleRepository>("IScheduleRepository", repos.scheduleRepo);
    container.registerInstance<IAppointmentRepository>("IAppointmentRepository", repos.appointmentRepo);

    container.registerSingleton(DoctorService, DoctorService);
    container.registerSingleton(PatientService, PatientService);
    container.registerSingleton(ScheduleService, ScheduleService);
    container.registerSingleton(AppointmentService, AppointmentService);
}

export { container };
