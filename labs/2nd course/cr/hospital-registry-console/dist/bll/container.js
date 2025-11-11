"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.registerRepos = registerRepos;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const services_1 = require("./services");
function registerRepos(repos) {
    tsyringe_1.container.registerInstance("IDoctorRepository", repos.doctorRepo);
    tsyringe_1.container.registerInstance("IPatientRepository", repos.patientRepo);
    tsyringe_1.container.registerInstance("IScheduleRepository", repos.scheduleRepo);
    tsyringe_1.container.registerInstance("IAppointmentRepository", repos.appointmentRepo);
    tsyringe_1.container.registerSingleton(services_1.DoctorService, services_1.DoctorService);
    tsyringe_1.container.registerSingleton(services_1.PatientService, services_1.PatientService);
    tsyringe_1.container.registerSingleton(services_1.ScheduleService, services_1.ScheduleService);
    tsyringe_1.container.registerSingleton(services_1.AppointmentService, services_1.AppointmentService);
}
