// TaskEither<E, A> represents an asynchronous computation
// that either yields a value of type A or fails yielding
// with an error of type E.

import { apply, taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/function";
import { type CatFact } from "./utils/catFacts";

const fetchRandomCatFact: TE.TaskEither<Error, CatFact> = TE.tryCatch(
  () =>
    fetch("https://cat-fact.herokuapp.com/facts/random").then((res) =>
      res.json()
    ),
  (reason) => new Error("Whoopsie: " + String(reason)),
);

// Log the result.
pipe(
  fetchRandomCatFact,
  TE.match(
    (err: Error) => console.error(err),
    (result: CatFact) => console.log(result.text),
  ),
)();
// -> "Cats have 245 bones."

// Use apply to combine multiple TaskEither instances into a single TaskEither.

pipe(
  apply.sequenceS(TE.ApplyPar)({ // TE.ApplyPar applies the tasks in parallel.
    catFact1: fetchRandomCatFact,
    catFact2: fetchRandomCatFact,
  }),
  TE.match(
    (err: Error) => console.error(err),
    (result: {
      catFact1: CatFact;
      catFact2: CatFact;
    }) => {
      console.log(result.catFact1.text);
      console.log(result.catFact2.text);
    },
  ),
)();
// -> "Cats are the most popular pet in the United States."
// -> "A cat sleeps a lot during the day and hunts during the night."

// Use apply.sequenceT when working with touples is preferred.

pipe(
  apply.sequenceT(TE.ApplyPar)(
    fetchRandomCatFact,
    fetchRandomCatFact,
  ),
  TE.match(
    (err: Error) => console.error(err),
    (result: [CatFact, CatFact]) => {
      console.log(result[0].text);
      console.log(result[0].text);
    },
  ),
)();
// -> "Cats are very amazing."
// -> "Cats are very independant pets."
