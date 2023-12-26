// An Applicative is a type class that defines the ap function,
// allowing you to apply a function inside a context to a value
// inside another context.

// In the example below, the Applicative is represented by the
// Option type.

import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";

const optionA = O.of((x: string) => x.length);
const optionB = O.of("Hello");

const resultOption = pipe(optionA, O.ap(optionB));

console.info(O.getOrElse(() => 0)(resultOption));
// -> 5

// The following example demonstrates applying a function to
// values inside multiple applicative contexts simultaneously
// without unwrapping them explicitly.

const optionC = O.of((x: number) => (y: number) => x + y);
const optionD = O.of(3);
const optionE = O.of(5);

const resultOption2 = pipe(
  optionC,
  O.ap(optionD),
  O.ap(optionE),
);

console.info(O.getOrElse(() => 0)(resultOption2));
// -> Outputs: 8
