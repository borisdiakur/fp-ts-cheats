// TaskEither<E, A> represents an asynchronous computation
// that either yields a value of type A or fails yielding
// with an error of type E.

import { type TaskEither, tryCatch } from "fp-ts/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

interface CatFact {
  _id: string;
  text: string;
}

const randomCatFactURL = "https://cat-fact.herokuapp.com/facts/random";
const fetchCatFacts: TaskEither<Error, CatFact> = tryCatch(
  () => fetch(randomCatFactURL).then((res) => res.json()),
  (reason) => new Error("Whoopsie: " + String(reason)),
);

// Log the result.
pipe(
  fetchCatFacts,
  TE.match(
    (err: Error) => console.error(err),
    (result: CatFact) => console.log(result.text),
  ),
)();
// -> "Cats have 245 bones."
