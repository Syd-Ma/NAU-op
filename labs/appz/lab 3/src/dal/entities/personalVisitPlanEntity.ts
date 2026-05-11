import { BaseEntity } from "./baseEntity.ts";

export interface PersonalVisitPlanEntity extends BaseEntity {
  visitorName: string;
  sessionIds: string[];
  plannedDate: string;
  routeSummary: string;
  totalCost: number;
}
