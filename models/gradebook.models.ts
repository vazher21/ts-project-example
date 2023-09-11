import { Id } from "./shared.models";

interface IBaseRecord {
  mark: number;
  lesson: number;
}
export interface IRecord extends IBaseRecord {
  pupilId: Id;
  teacherId: Id;
  subjectId: Id;
}

export interface IRecordFormatted extends IBaseRecord {
  teacher: string;
  subject: string;
}

export interface IPupilsRecords {
  name: string;
  records: IRecordFormatted[];
}
