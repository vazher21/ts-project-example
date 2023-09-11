import { generateRandomId } from "../helpers/utils";

export type Id = string;
export interface EntityWithId {
  id: Id;
}

export interface IPhone {
  phone: string;
  primary: boolean;
}

export interface IEmail {
  email: string;
  primary: true;
}

export type IGender = "male" | "female";
export abstract class Db<CreateModel, Model extends EntityWithId> {
  protected readonly db = new Map<Id, Model>();
  public add(data: CreateModel): Id {
    const id = generateRandomId();
    this.db.set(id, { ...data, id } as unknown as Model);
    return id;
  }

  public remove(id: Id): void {
    this.db.delete(id);
  }
}
