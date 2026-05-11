import { CustomTourRequestInput, PersonalVisitPlanningRequest, PlannedTourBookingRequest } from "../dto/museumRequests.ts";
import { CustomTourRequest } from "../models/customTourRequest.ts";
import { Exhibition } from "../models/exhibition.ts";
import { ExhibitionSession } from "../models/exhibitionSession.ts";
import { PersonalVisitPlan } from "../models/personalVisitPlan.ts";
import { PlannedTour } from "../models/plannedTour.ts";

export interface IMuseumService {
  getAllExhibitions(): Promise<Exhibition[]>;
  findExhibitions(theme?: string, targetAudience?: string): Promise<Exhibition[]>;
  getSessionsByDate(exhibitionDate: string): Promise<ExhibitionSession[]>;
  planPersonalVisit(request: PersonalVisitPlanningRequest): Promise<PersonalVisitPlan>;
  getPlannedToursByDate(exhibitionDate: string): Promise<PlannedTour[]>;
  bookPlannedTour(request: PlannedTourBookingRequest): Promise<PlannedTour>;
  requestCustomTour(request: CustomTourRequestInput): Promise<CustomTourRequest>;
  getCustomTourRequests(): Promise<CustomTourRequest[]>;
}
