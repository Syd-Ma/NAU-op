import { Appointment } from "../entities/Appointment";
import { ID } from "../types/ID";

export interface IAppointmentRepository {
    add(appointment: Appointment): Promise<void>;
    remove(id: ID): Promise<void>;
    listBySlot(slotId: ID): Promise<Appointment[]>;
    listByDoctor(doctorId: ID): Promise<Appointment[]>;
    listByPatient(patientId: ID): Promise<Appointment[]>;
}
