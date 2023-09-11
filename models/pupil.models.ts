import { IPerson, IPersonCreateModel } from "./person.models";
import { EntityWithId } from "./shared.models";

export interface IPupilCreateModel extends IPersonCreateModel {}
export type IPupil = IPupilCreateModel & EntityWithId;
