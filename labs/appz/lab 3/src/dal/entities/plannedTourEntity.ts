import { BaseEntity } from "./baseEntity.ts";

export interface PlannedTourEntity extends BaseEntity {
  title: string;
  sessionId: string;
  startsAt: string;
  durationMinutes: number;
  maxVisitors: number;
  reservedVisitors: number;
  pricePerVisitor: number;
}
