import { filter } from "rxjs/operators";

export const all = <T>(...conditions: ((value: T) => boolean)[]) =>
  filter((value: T) => conditions.every(condition => condition(value)));

export const any = <T>(...conditions: ((value: T) => boolean)[]) =>
  filter((value: T) => conditions.some(condition => condition(value)));
