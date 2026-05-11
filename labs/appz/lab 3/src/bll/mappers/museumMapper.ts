import { randomUUID } from "node:crypto";
import { Exhibition } from "../models/exhibition.ts";
import { ExhibitionSession } from "../models/exhibitionSession.ts";
import { PlannedTour } from "../models/plannedTour.ts";
import { PersonalVisitPlan } from "../models/personalVisitPlan.ts";
import { CustomTourRequest } from "../models/customTourRequest.ts";
import { ExhibitionEntity } from "../../dal/entities/exhibitionEntity.ts";
import { ExhibitionSessionEntity } from "../../dal/entities/exhibitionSessionEntity.ts";
import { PlannedTourEntity } from "../../dal/entities/plannedTourEntity.ts";
import { PersonalVisitPlanEntity } from "../../dal/entities/personalVisitPlanEntity.ts";
import { CustomTourRequestEntity } from "../../dal/entities/customTourRequestEntity.ts";

export class MuseumMapper {
  static toExhibitionModel(entity: ExhibitionEntity): Exhibition {
    return { ...entity };
  }

  static toSessionModel(entity: ExhibitionSessionEntity, exhibition: ExhibitionEntity): ExhibitionSession {
    return {
      id: entity.id,
      exhibitionId: entity.exhibitionId,
      exhibitionTitle: exhibition.title,
      exhibitionDate: entity.exhibitionDate,
      opensAt: entity.opensAt,
      closesAt: entity.closesAt
    };
  }

  static toPlannedTourModel(entity: PlannedTourEntity, session: ExhibitionSessionEntity, exhibition: ExhibitionEntity): PlannedTour {
    return {
      id: entity.id,
      title: entity.title,
      exhibitionTitle: exhibition.title,
      exhibitionDate: session.exhibitionDate,
      startsAt: entity.startsAt,
      durationMinutes: entity.durationMinutes,
      freePlaces: entity.maxVisitors - entity.reservedVisitors,
      pricePerVisitor: entity.pricePerVisitor
    };
  }

  static toPersonalVisitPlanEntity(
    visitorName: string,
    plannedDate: string,
    routeSummary: string,
    totalCost: number,
    sessionIds: string[]
  ): PersonalVisitPlanEntity {
    return {
      id: randomUUID(),
      visitorName,
      plannedDate,
      routeSummary,
      totalCost,
      sessionIds
    };
  }

  static toPersonalVisitPlanModel(entity: PersonalVisitPlanEntity): PersonalVisitPlan {
    return { ...entity };
  }

  static toCustomTourRequestEntity(
    visitorName: string,
    requestedDate: string,
    exhibitionIds: string[],
    participantsCount: number,
    estimatedPrice: number
  ): CustomTourRequestEntity {
    return {
      id: randomUUID(),
      visitorName,
      requestedDate,
      exhibitionIds,
      participantsCount,
      estimatedPrice,
      status: "Requested"
    };
  }

  static toCustomTourRequestModel(
    entity: CustomTourRequestEntity,
    exhibitions: ExhibitionEntity[]
  ): CustomTourRequest {
    return {
      id: entity.id,
      visitorName: entity.visitorName,
      requestedDate: entity.requestedDate,
      exhibitionTitles: exhibitions.map((item) => item.title),
      participantsCount: entity.participantsCount,
      estimatedPrice: entity.estimatedPrice,
      status: entity.status
    };
  }
}
