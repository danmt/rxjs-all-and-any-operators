import { filter } from "rxjs/operators";

export function all<T>(conditions: ((value: T) => boolean)[]) {
  return filter((value: T) => conditions.every(condition => condition(value)));
}

export function any<T>(conditions: ((value: T) => boolean)[]) {
  return filter((value: T) => conditions.some(condition => condition(value)));
}
