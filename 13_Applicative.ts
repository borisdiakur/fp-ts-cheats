// An Applicative is a type class that defines the ap function,
// allowing you to apply a function inside a context to a value
// inside another context.

// In the example below, the Applicative is represented by the
// Option type.

import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

const optionGetLength = O.of((x: string) => x.length);
const optionString = O.of("Hello");

const optionSrtingLength = pipe(optionGetLength, O.ap(optionString));

console.info(O.getOrElse(() => 0)(optionSrtingLength));
// -> 5

// The following example demonstrates applying a function to
// values inside multiple applicative contexts simultaneously
// without unwrapping them explicitly.

const optionGetSum = O.of((x: number) => (y: number) => x + y);
const optionX = O.of(3);
const optionY = O.of(5);

const optionSum = pipe(
  optionGetSum,
  O.ap(optionX),
  O.ap(optionY),
);

console.info(O.getOrElse(() => 0)(optionSum));
// -> Outputs: 8

// Applicatives allow us to run code in parallel.

interface CatFact {
  _id: string;
  text: string;
}

const fetchRandomCatFact = (): Promise<CatFact> =>
  fetch("https://cat-fact.herokuapp.com/facts/random").then((res) =>
    res.json()
  );

// Wrap the async operation result in a TaskEither monad.
const fetchRandomCatFactTE = TE.tryCatch(
  fetchRandomCatFact,
  (err) => new Error(`Whoopsie: ${err}`),
);

// Execute tasks in parallel and combine the results.
const fetchTwoCatFacts = pipe(
  TE.of((fact1: CatFact) => (fact2: CatFact) =>
    `Two cat facts:\n- ${fact1.text}\n- ${fact2.text}`
  ),
  TE.ap(fetchRandomCatFactTE),
  TE.ap(fetchRandomCatFactTE),
);

// Log the result.
pipe(
  fetchTwoCatFacts,
  TE.match(
    (err: Error) => console.error(err),
    (result: string) => console.log(result),
  ),
)();
// -> "Two cat facts:
// - Kittens are born not only blind, but also deaf.
// - Cats can help you meet people and make friends."
