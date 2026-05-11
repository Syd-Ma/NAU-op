import { BaseEntity } from "./baseEntity.ts";

export interface ExhibitionEntity extends BaseEntity {
  title: string;
  theme: string;
  targetAudience: string;
  hall: string;
  baseTicketPrice: number;
  supportsGuidedTour: boolean;
}
