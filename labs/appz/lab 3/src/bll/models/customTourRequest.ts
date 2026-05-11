export interface CustomTourRequest {
  id: string;
  visitorName: string;
  requestedDate: string;
  exhibitionTitles: string[];
  participantsCount: number;
  estimatedPrice: number;
  status: "Requested" | "Confirmed";
}
