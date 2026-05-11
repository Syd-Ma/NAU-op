import { BaseEntity } from "./baseEntity.ts";

export interface CustomTourRequestEntity extends BaseEntity {
  visitorName: string;
  requestedDate: string;
  exhibitionIds: string[];
  participantsCount: number;
  estimatedPrice: number;
  status: "Requested" | "Confirmed";
}
