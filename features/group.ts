import { IGroup, IRoomNumber } from "../models/group.models";
import { Id } from "../models/shared.models";
import { generateRandomId } from "../helpers/utils";
import { IPupil } from "../models/pupil.models";

export class Groups {
  private readonly map = new Map<Id, IGroup>();

  public add(room: IRoomNumber): Id {
    const id = generateRandomId();
    this.map.set(id, { id, room, pupils: [] });
    return id;
  }

  public addPupil(groupId: Id, p: IPupil) {
    const group = this.map.get(groupId);
    if (!group) {
      throw new Error("invalid group id");
    }
    this.map.set(groupId, { ...group, pupils: [...group.pupils, p] });
  }

  public removePupil(groupId: Id, pupilId: Id) {
    const group = this.getGroup(groupId);
    this.map.set(groupId, {
      ...group,
      pupils: group.pupils.filter((p) => p.id !== pupilId),
    });
  }

  public update(groupId: Id, newRoom: Pick<IGroup, "room">) {
    const group = this.getGroup(groupId);
    this.map.set(groupId, { ...group, ...newRoom });
  }

  public read(groupId: Id): IGroup {
    const group = this.getGroup(groupId);
    return group;
  }

  public readAll(): IGroup[] {
    return [...this.map.values()];
  }

  private getGroup(groupId: Id): IGroup {
    const group = this.map.get(groupId);
    if (!group) {
      throw new Error("invalid group id");
    }
    return group;
  }
}
