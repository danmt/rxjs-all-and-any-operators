import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

export const fromChange = (formElement: HTMLFormElement) =>
  fromEvent(formElement, "change").pipe(
    tap(ev => ev.preventDefault()),
    map(() => {
      const formData = new FormData(formElement);
      const formValue: any = {};

      for (let [field, value] of formData.entries()) {
        formValue[field] = value;
      }

      return formValue;
    })
  );

export const isDivisible = (y: number) => (x: number) => x % y === 0;
export const isHigherThan = (y: number) => (x: number) => x > y;
export const isLowerThan = (y: number) => (x: number) => x < y;
