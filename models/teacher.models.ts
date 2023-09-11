import { IPersonCreateModel } from "./person.models";
import { EntityWithId, IEmail } from "./shared.models";

export interface ITeacherCreateModel extends IPersonCreateModel {
  subjects: { subject: string }[];
  emails: IEmail[];
}
export type ITeacher = ITeacherCreateModel & EntityWithId;
