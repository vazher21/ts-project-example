import { Db } from "../models/shared.models";
import { ISubject, ISubjectCreateModel } from "../models/subject.models";

export class Subjects extends Db<ISubjectCreateModel, ISubject> {
  public verify(subject: Pick<ISubject, "title">) {
    return !![...this.db.values()].find((s) => s.title === subject.title);
  }

  public readAll() {
    return [...this.db.values()];
  }
}
