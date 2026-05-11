import { CustomTourRequestEntity } from "../entities/customTourRequestEntity.ts";
import { ExhibitionEntity } from "../entities/exhibitionEntity.ts";
import { ExhibitionSessionEntity } from "../entities/exhibitionSessionEntity.ts";
import { PersonalVisitPlanEntity } from "../entities/personalVisitPlanEntity.ts";
import { PlannedTourEntity } from "../entities/plannedTourEntity.ts";
import { IRepository } from "./repository.ts";

export interface IUnitOfWork {
  exhibitions: IRepository<ExhibitionEntity>;
  sessions: IRepository<ExhibitionSessionEntity>;
  plannedTours: IRepository<PlannedTourEntity>;
  personalVisitPlans: IRepository<PersonalVisitPlanEntity>;
  customTourRequests: IRepository<CustomTourRequestEntity>;
  saveChanges(): Promise<void>;
}
