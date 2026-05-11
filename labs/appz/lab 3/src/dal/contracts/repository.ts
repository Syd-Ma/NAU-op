import { BaseEntity } from "../entities/baseEntity.ts";

export interface IRepository<T extends BaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  add(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  remove(id: string): Promise<boolean>;
}
