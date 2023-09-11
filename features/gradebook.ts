import { Groups } from "./group";
import { Teachers } from "./teacher";
import { Id } from "../models/shared.models";
import { IPupilsRecords, IRecord } from "../models/gradebook.models";
import { generateRandomId } from "../helpers/utils";
import { Subjects } from "./subject";
import { IPupil } from "../models/pupil.models";

export class Gradebooks {
  private readonly map = new Map<Id, { groupId: Id; records: IRecord[] }>();
  constructor(
    private groups: Groups,
    private teachers: Teachers,
    private subjects: Subjects
  ) {}

  public add(groupId: Id) {
    if (!this.groups.read(groupId)) {
      throw new Error("group does not exist");
    }
    const id = generateRandomId();
    this.map.set(id, { groupId, records: [] });
    return id;
  }

  public clear() {
    this.map.clear();
  }

  public addRecord(gBookId: Id, record: IRecord) {
    const gBook = this.map.get(gBookId);
    if (!gBook) {
      throw new Error("gradebook does not exist");
    }
    gBook.records.push(record);
  }

  public read(gBookId: Id, pupilId: Id): IPupilsRecords {
    const gBook = this.map.get(gBookId);
    if (!gBook) {
      throw new Error("gradebook does not exist");
    }
    const pupil = this.groups
      .read(gBook.groupId)
      .pupils.find((p) => p.id === pupilId) as IPupil;

    const pupilsRecords: IPupilsRecords = {
      name: pupil.name.first + " " + pupil.name.last,
      records: [],
    };

    for (const record of gBook.records) {
      if (record.pupilId !== pupilId) {
        continue;
      }
      const subject = this.subjects
        .readAll()
        .find((s) => s.id === record.subjectId)!;
      const teacher = this.teachers.read(record.teacherId);
      pupilsRecords.records.push({
        lesson: record.lesson,
        mark: record.mark,
        subject: subject.title,
        teacher: teacher.name.first + " " + teacher.name.last,
      });
    }
    return pupilsRecords;
  }

  public readAll() {
    return [...this.map.values()];
  }
}
