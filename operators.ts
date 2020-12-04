import { from } from "rxjs";
import { concatMap, distinct, filter, last, toArray } from "rxjs/operators";

export const all = <T>(...conditions: ((value: T) => boolean)[]) =>
  filter((value: T) => conditions.every(condition => condition(value)));

export const any = <T>(...conditions: ((value: T) => boolean)[]) =>
  filter((value: T) => conditions.some(condition => condition(value)));

export const concatUnique = <T, U>(
  arrays: T[][],
  keySelector?: (value: T) => U
) =>
  from(arrays).pipe(
    concatMap(array => from(array)),
    distinct<T, U>(keySelector),
    toArray()
  );
