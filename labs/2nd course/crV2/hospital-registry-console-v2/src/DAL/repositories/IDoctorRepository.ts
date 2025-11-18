import { Doctor } from "../../BLL/entities/Doctor";
import { ID } from "../../BLL/types/ID";

export interface IDoctorRepository {
    add(doctor: Doctor): Promise<void>;
    update(doctor: Doctor): Promise<void>;
    remove(id: ID): Promise<void>;
    getById(id: ID): Promise<Doctor | undefined>;
    list(): Promise<Doctor[]>;
    findByNameOrSpec(query: string): Promise<Doctor[]>;
}
