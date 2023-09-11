import { Person } from "../models/person.models";
import { ITeacher, ITeacherCreateModel } from "../models/teacher.models";

export class Teachers extends Person<ITeacherCreateModel, ITeacher> {}
