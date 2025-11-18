import { Patient } from "../../BLL/entities/Patient";
import { ID } from "../../BLL/types/ID";

export interface IPatientRepository {
    add(patient: Patient): Promise<void>;
    update(patient: Patient): Promise<void>;
    remove(id: ID): Promise<void>;
    getById(id: ID): Promise<Patient | undefined>;
    list(): Promise<Patient[]>;
    findByName(query: string): Promise<Patient[]>;
}
