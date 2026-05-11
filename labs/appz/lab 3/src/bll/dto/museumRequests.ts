export interface PersonalVisitPlanningRequest {
  visitorName: string;
  sessionIds: string[];
}

export interface PlannedTourBookingRequest {
  visitorName: string;
  plannedTourId: string;
  visitorsCount: number;
}

export interface CustomTourRequestInput {
  visitorName: string;
  requestedDate: string;
  exhibitionIds: string[];
  participantsCount: number;
}
