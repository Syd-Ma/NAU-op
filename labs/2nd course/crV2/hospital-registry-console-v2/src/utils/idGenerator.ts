import { ID } from "../BLL/types/ID";

export function generateId(): ID {
    return `${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;
}
