import { IRepository } from "../contracts/repository.ts";
import { BaseEntity } from "../entities/baseEntity.ts";

export class GenericRepository<T extends BaseEntity> implements IRepository<T> {
  constructor(private readonly collectionProvider: () => T[]) {}

  async getAll(): Promise<T[]> {
    return [...this.collectionProvider()];
  }

  async getById(id: string): Promise<T | undefined> {
    return this.collectionProvider().find((entity) => entity.id === id);
  }

  async add(entity: T): Promise<void> {
    this.collectionProvider().push(entity);
  }

  async update(entity: T): Promise<void> {
    const collection = this.collectionProvider();
    const index = collection.findIndex((item) => item.id === entity.id);
    if (index < 0) {
      throw new Error(`Entity with id ${entity.id} was not found.`);
    }

    collection[index] = entity;
  }

  async remove(id: string): Promise<boolean> {
    const collection = this.collectionProvider();
    const index = collection.findIndex((entity) => entity.id === id);
    if (index < 0) {
      return false;
    }

    collection.splice(index, 1);
    return true;
  }
}
