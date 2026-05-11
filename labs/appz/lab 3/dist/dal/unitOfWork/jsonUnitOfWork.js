import { GenericRepository } from "../repositories/genericRepository.js";
export class JsonUnitOfWork {
    context;
    database;
    exhibitions;
    sessions;
    plannedTours;
    personalVisitPlans;
    customTourRequests;
    constructor(context, database) {
        this.context = context;
        this.database = database;
        this.exhibitions = new GenericRepository(() => this.database.exhibitions);
        this.sessions = new GenericRepository(() => this.database.sessions);
        this.plannedTours = new GenericRepository(() => this.database.plannedTours);
        this.personalVisitPlans = new GenericRepository(() => this.database.personalVisitPlans);
        this.customTourRequests = new GenericRepository(() => this.database.customTourRequests);
    }
    static async create(context) {
        const database = await context.getDatabase();
        return new JsonUnitOfWork(context, database);
    }
    async saveChanges() {
        await this.context.saveChanges();
    }
}
