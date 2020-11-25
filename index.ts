import { combineLatest, of } from "rxjs";
import { map, mergeMap, startWith, tap } from "rxjs/operators";
import { all, any } from "./operators";
import { fromChange, isDivisible, isHigherThan, isLowerThan } from "./utils";

const formElement = document.getElementById("form") as HTMLFormElement;

fromChange(formElement)
  .pipe(
    startWith({
      value: "12",
      lowerBound: "6",
      upperBound: "15",
      divisor: "3"
    }),
    map(({ value, lowerBound, upperBound, divisor }) => ({
      value: parseInt(value),
      lowerBound: parseInt(lowerBound),
      upperBound: parseInt(upperBound),
      divisor: parseInt(divisor)
    })),
    tap(({ value, lowerBound, upperBound, divisor }) => {
      console.log("\n\n");
      console.log("Value: ", value);
      console.log("Lower bound: ", lowerBound);
      console.log("Upper bound: ", upperBound);
      console.log("Divisor: ", divisor);

      console.log("Conditions:");
      console.log(
        `- Value (${value}) is higher than (${lowerBound}).`,
        isHigherThan(lowerBound)(value)
      );
      console.log(
        `- Value (${value}) is lower than (${upperBound}).`,
        isLowerThan(upperBound)(value)
      );
      console.log(
        `- Value (${value}) is divisible by (${divisor}).`,
        isDivisible(divisor)(value)
      );
    }),
    mergeMap(({ value, lowerBound, upperBound, divisor }) =>
      combineLatest([
        of(value).pipe(
          all(
            isHigherThan(lowerBound),
            isLowerThan(upperBound),
            isDivisible(divisor)
          ),
          tap(() => console.log("All conditions are met"))
        ),
        of(value).pipe(
          any(
            isHigherThan(lowerBound),
            isLowerThan(upperBound),
            isDivisible(divisor)
          ),
          tap(() => console.log("At least one condition is met"))
        )
      ])
    )
  )

  .subscribe();
