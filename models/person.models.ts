import { Db, EntityWithId, Id, IGender, IPhone } from "./shared.models";

export interface IPersonCreateModel {
  name: {
    first: string;
    last: string;
  };
  dateOfBirth: string;
  phones: IPhone[];
  sex: IGender;
  description?: string;
}
export type IPerson = IPersonCreateModel & EntityWithId;

export abstract class Person<
  CreateModel extends IPersonCreateModel,
  Model extends IPerson
> extends Db<CreateModel, Model> {
  public update(id: Id, newPerson: IPersonCreateModel): void {
    const old = this.db.get(id);
    this.db.set(id, { ...old, ...newPerson } as Model);
  }

  public read(id: Id) {
    return this.db.get(id) as Model;
  }
}
