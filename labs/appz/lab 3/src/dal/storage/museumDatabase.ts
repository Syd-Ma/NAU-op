import { CustomTourRequestEntity } from "../entities/customTourRequestEntity.ts";
import { ExhibitionEntity } from "../entities/exhibitionEntity.ts";
import { ExhibitionSessionEntity } from "../entities/exhibitionSessionEntity.ts";
import { PersonalVisitPlanEntity } from "../entities/personalVisitPlanEntity.ts";
import { PlannedTourEntity } from "../entities/plannedTourEntity.ts";

export interface MuseumDatabase {
  exhibitions: ExhibitionEntity[];
  sessions: ExhibitionSessionEntity[];
  plannedTours: PlannedTourEntity[];
  personalVisitPlans: PersonalVisitPlanEntity[];
  customTourRequests: CustomTourRequestEntity[];
}
