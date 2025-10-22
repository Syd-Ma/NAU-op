export abstract class DataProvider<T> {
    constructor(protected filePath: string) {}
    abstract save(data: T): Promise<void>
    abstract load(): Promise<T>
}