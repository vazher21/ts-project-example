import { EntityWithId } from "./shared.models";

export interface ISubjectCreateModel {
  title: string;
  lessons: number;
  description?: string;
}

export type ISubject = ISubjectCreateModel & EntityWithId;
