import { Id } from "./shared.models";
import { IPupil } from "./pupil.models";

export type IRoomNumber = number;

export interface IGroup {
  id: Id;
  room: IRoomNumber;
  pupils: IPupil[];
}
