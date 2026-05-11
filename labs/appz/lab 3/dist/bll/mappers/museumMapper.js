import { randomUUID } from "node:crypto";
export class MuseumMapper {
    static toExhibitionModel(entity) {
        return { ...entity };
    }
    static toSessionModel(entity, exhibition) {
        return {
            id: entity.id,
            exhibitionId: entity.exhibitionId,
            exhibitionTitle: exhibition.title,
            exhibitionDate: entity.exhibitionDate,
            opensAt: entity.opensAt,
            closesAt: entity.closesAt
        };
    }
    static toPlannedTourModel(entity, session, exhibition) {
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
    static toPersonalVisitPlanEntity(visitorName, plannedDate, routeSummary, totalCost, sessionIds) {
        return {
            id: randomUUID(),
            visitorName,
            plannedDate,
            routeSummary,
            totalCost,
            sessionIds
        };
    }
    static toPersonalVisitPlanModel(entity) {
        return { ...entity };
    }
    static toCustomTourRequestEntity(visitorName, requestedDate, exhibitionIds, participantsCount, estimatedPrice) {
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
    static toCustomTourRequestModel(entity, exhibitions) {
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
