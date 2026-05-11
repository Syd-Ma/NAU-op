import { randomUUID } from "node:crypto";
export function createSeedDatabase() {
    const ancientArtId = randomUUID();
    const scienceId = randomUUID();
    const familyId = randomUUID();
    const ancientMorningId = randomUUID();
    const scienceAfternoonId = randomUUID();
    const familyWeekendId = randomUUID();
    return {
        exhibitions: [
            {
                id: ancientArtId,
                title: "Echoes of Ancient Civilizations",
                theme: "History",
                targetAudience: "Adults",
                hall: "Hall A",
                baseTicketPrice: 220,
                supportsGuidedTour: true
            },
            {
                id: scienceId,
                title: "Interactive Science Lab",
                theme: "Science",
                targetAudience: "Students",
                hall: "Hall B",
                baseTicketPrice: 180,
                supportsGuidedTour: true
            },
            {
                id: familyId,
                title: "Museum for Families",
                theme: "Family Leisure",
                targetAudience: "Children",
                hall: "Hall C",
                baseTicketPrice: 150,
                supportsGuidedTour: false
            }
        ],
        sessions: [
            {
                id: ancientMorningId,
                exhibitionId: ancientArtId,
                exhibitionDate: "2026-05-12",
                opensAt: "10:00",
                closesAt: "14:00"
            },
            {
                id: scienceAfternoonId,
                exhibitionId: scienceId,
                exhibitionDate: "2026-05-12",
                opensAt: "14:30",
                closesAt: "18:00"
            },
            {
                id: familyWeekendId,
                exhibitionId: familyId,
                exhibitionDate: "2026-05-13",
                opensAt: "11:00",
                closesAt: "16:00"
            }
        ],
        plannedTours: [
            {
                id: randomUUID(),
                title: "History Highlights Tour",
                sessionId: ancientMorningId,
                startsAt: "11:00",
                durationMinutes: 90,
                maxVisitors: 15,
                reservedVisitors: 3,
                pricePerVisitor: 280
            },
            {
                id: randomUUID(),
                title: "Science Discovery Tour",
                sessionId: scienceAfternoonId,
                startsAt: "15:00",
                durationMinutes: 75,
                maxVisitors: 12,
                reservedVisitors: 5,
                pricePerVisitor: 250
            }
        ],
        personalVisitPlans: [],
        customTourRequests: []
    };
}
