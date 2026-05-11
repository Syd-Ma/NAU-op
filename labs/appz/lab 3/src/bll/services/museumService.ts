import { IUnitOfWork } from "../../dal/contracts/unitOfWork.ts";
import { ExhibitionEntity } from "../../dal/entities/exhibitionEntity.ts";
import { MuseumMapper } from "../mappers/museumMapper.ts";
import { IMuseumService } from "../contracts/museumService.ts";
import { CustomTourRequestInput, PersonalVisitPlanningRequest, PlannedTourBookingRequest } from "../dto/museumRequests.ts";
import { CustomTourRequest } from "../models/customTourRequest.ts";
import { Exhibition } from "../models/exhibition.ts";
import { ExhibitionSession } from "../models/exhibitionSession.ts";
import { PersonalVisitPlan } from "../models/personalVisitPlan.ts";
import { PlannedTour } from "../models/plannedTour.ts";

export class MuseumService implements IMuseumService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async getAllExhibitions(): Promise<Exhibition[]> {
    const exhibitions = await this.unitOfWork.exhibitions.getAll();
    return exhibitions.map((item) => MuseumMapper.toExhibitionModel(item));
  }

  async findExhibitions(theme?: string, targetAudience?: string): Promise<Exhibition[]> {
    const exhibitions = await this.unitOfWork.exhibitions.getAll();
    const filtered = exhibitions.filter((item) => {
      const matchesTheme = theme === undefined || item.theme.toLowerCase().includes(theme.toLowerCase());
      const matchesAudience =
        targetAudience === undefined ||
        item.targetAudience.toLowerCase().includes(targetAudience.toLowerCase());
      return matchesTheme && matchesAudience;
    });

    return filtered.map((item) => MuseumMapper.toExhibitionModel(item));
  }

  async getSessionsByDate(exhibitionDate: string): Promise<ExhibitionSession[]> {
    const sessions = await this.unitOfWork.sessions.getAll();
    const exhibitions = await this.unitOfWork.exhibitions.getAll();

    return sessions
      .filter((item) => item.exhibitionDate === exhibitionDate)
      .map((item) => {
        const exhibition = this.requireEntity(
          exhibitions.find((exhibitionItem) => exhibitionItem.id === item.exhibitionId),
          `Exhibition ${item.exhibitionId} was not found for session ${item.id}.`
        );
        return MuseumMapper.toSessionModel(item, exhibition);
      });
  }

  async planPersonalVisit(request: PersonalVisitPlanningRequest): Promise<PersonalVisitPlan> {
    if (request.sessionIds.length === 0) {
      throw new Error("At least one exhibition session must be selected.");
    }

    const sessions = await this.unitOfWork.sessions.getAll();
    const exhibitions = await this.unitOfWork.exhibitions.getAll();
    const selectedSessions = request.sessionIds.map((sessionId) =>
      this.requireEntity(
        sessions.find((item) => item.id === sessionId),
        `Session ${sessionId} was not found.`
      )
    );

    const plannedDate = selectedSessions[0].exhibitionDate;
    if (selectedSessions.some((item) => item.exhibitionDate !== plannedDate)) {
      throw new Error("All selected exhibitions for a personal visit must be on the same date.");
    }

    const sortedSessions = [...selectedSessions].sort((left, right) =>
      left.opensAt.localeCompare(right.opensAt)
    );

    for (let index = 1; index < sortedSessions.length; index += 1) {
      if (sortedSessions[index - 1].closesAt > sortedSessions[index].opensAt) {
        throw new Error("Selected exhibition sessions overlap in time.");
      }
    }

    const routeParts: string[] = [];
    let totalCost = 0;
    for (const session of sortedSessions) {
      const exhibition = this.requireEntity(
        exhibitions.find((item) => item.id === session.exhibitionId),
        `Exhibition ${session.exhibitionId} was not found.`
      );
      totalCost += exhibition.baseTicketPrice;
      routeParts.push(`${exhibition.title} (${session.opensAt}-${session.closesAt}, ${exhibition.hall})`);
    }

    const entity = MuseumMapper.toPersonalVisitPlanEntity(
      request.visitorName,
      plannedDate,
      routeParts.join(" -> "),
      totalCost,
      sortedSessions.map((item) => item.id)
    );

    await this.unitOfWork.personalVisitPlans.add(entity);
    await this.unitOfWork.saveChanges();
    return MuseumMapper.toPersonalVisitPlanModel(entity);
  }

  async getPlannedToursByDate(exhibitionDate: string): Promise<PlannedTour[]> {
    const tours = await this.unitOfWork.plannedTours.getAll();
    const sessions = await this.unitOfWork.sessions.getAll();
    const exhibitions = await this.unitOfWork.exhibitions.getAll();

    return tours
      .filter((tour) => sessions.find((session) => session.id === tour.sessionId)?.exhibitionDate === exhibitionDate)
      .map((tour) => {
        const session = this.requireEntity(
          sessions.find((item) => item.id === tour.sessionId),
          `Session ${tour.sessionId} was not found.`
        );
        const exhibition = this.requireEntity(
          exhibitions.find((item) => item.id === session.exhibitionId),
          `Exhibition ${session.exhibitionId} was not found.`
        );
        return MuseumMapper.toPlannedTourModel(tour, session, exhibition);
      });
  }

  async bookPlannedTour(request: PlannedTourBookingRequest): Promise<PlannedTour> {
    if (request.visitorsCount < 1) {
      throw new Error("At least one visitor must be booked.");
    }

    const tour = this.requireEntity(
      await this.unitOfWork.plannedTours.getById(request.plannedTourId),
      `Planned tour ${request.plannedTourId} was not found.`
    );

    if (tour.reservedVisitors + request.visitorsCount > tour.maxVisitors) {
      throw new Error("There are not enough free places on the planned tour.");
    }

    const updatedTour = {
      ...tour,
      reservedVisitors: tour.reservedVisitors + request.visitorsCount
    };

    await this.unitOfWork.plannedTours.update(updatedTour);
    await this.unitOfWork.saveChanges();

    const session = this.requireEntity(
      await this.unitOfWork.sessions.getById(updatedTour.sessionId),
      `Session ${updatedTour.sessionId} was not found.`
    );
    const exhibition = this.requireEntity(
      await this.unitOfWork.exhibitions.getById(session.exhibitionId),
      `Exhibition ${session.exhibitionId} was not found.`
    );

    return MuseumMapper.toPlannedTourModel(updatedTour, session, exhibition);
  }

  async requestCustomTour(request: CustomTourRequestInput): Promise<CustomTourRequest> {
    if (request.exhibitionIds.length === 0) {
      throw new Error("A custom tour must contain at least one exhibition.");
    }

    if (request.participantsCount < 1) {
      throw new Error("Participants count must be positive.");
    }

    const exhibitions = await this.unitOfWork.exhibitions.getAll();
    const selectedExhibitions = request.exhibitionIds.map((exhibitionId) =>
      this.requireEntity(
        exhibitions.find((item) => item.id === exhibitionId),
        `Exhibition ${exhibitionId} was not found.`
      )
    );

    if (selectedExhibitions.some((item) => !item.supportsGuidedTour)) {
      throw new Error("One of the selected exhibitions does not support custom guided tours.");
    }

    const estimatedPrice =
      selectedExhibitions.reduce((sum, exhibition) => sum + exhibition.baseTicketPrice, 0) *
        request.participantsCount +
      500;

    const entity = MuseumMapper.toCustomTourRequestEntity(
      request.visitorName,
      request.requestedDate,
      request.exhibitionIds,
      request.participantsCount,
      estimatedPrice
    );

    await this.unitOfWork.customTourRequests.add(entity);
    await this.unitOfWork.saveChanges();
    return MuseumMapper.toCustomTourRequestModel(entity, selectedExhibitions);
  }

  async getCustomTourRequests(): Promise<CustomTourRequest[]> {
    const requests = await this.unitOfWork.customTourRequests.getAll();
    const exhibitions = await this.unitOfWork.exhibitions.getAll();

    return requests.map((request) => {
      const relatedExhibitions = request.exhibitionIds.map((exhibitionId) =>
        this.requireEntity(
          exhibitions.find((item) => item.id === exhibitionId),
          `Exhibition ${exhibitionId} was not found.`
        )
      );
      return MuseumMapper.toCustomTourRequestModel(request, relatedExhibitions);
    });
  }

  private requireEntity<T>(entity: T | undefined, errorMessage: string): T {
    if (entity === undefined) {
      throw new Error(errorMessage);
    }

    return entity;
  }
}
