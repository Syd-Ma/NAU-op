import { BaseEntity } from "./baseEntity.ts";

export interface ExhibitionSessionEntity extends BaseEntity {
  exhibitionId: string;
  exhibitionDate: string;
  opensAt: string;
  closesAt: string;
}
