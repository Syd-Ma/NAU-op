import { IUnitOfWork } from "../contracts/unitOfWork.ts";
import { GenericRepository } from "../repositories/genericRepository.ts";
import { JsonDataContext } from "../storage/jsonDataContext.ts";

export class JsonUnitOfWork implements IUnitOfWork {
  readonly exhibitions;
  readonly sessions;
  readonly plannedTours;
  readonly personalVisitPlans;
  readonly customTourRequests;

  private constructor(private readonly context: JsonDataContext, private readonly database: Awaited<ReturnType<JsonDataContext["getDatabase"]>>) {
    this.exhibitions = new GenericRepository(() => this.database.exhibitions);
    this.sessions = new GenericRepository(() => this.database.sessions);
    this.plannedTours = new GenericRepository(() => this.database.plannedTours);
    this.personalVisitPlans = new GenericRepository(() => this.database.personalVisitPlans);
    this.customTourRequests = new GenericRepository(() => this.database.customTourRequests);
  }

  static async create(context: JsonDataContext): Promise<JsonUnitOfWork> {
    const database = await context.getDatabase();
    return new JsonUnitOfWork(context, database);
  }

  async saveChanges(): Promise<void> {
    await this.context.saveChanges();
  }
}
