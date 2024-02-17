// Monads are pointed functors that can flatten.

// A monad has two main operations: `of` and `chain`
// (the latter is also known as flatMap or join).

// `of` lifts a value into the Monad context.
// `chain` allows us to sequence computations by applying
// a function that returns a new Monad.

import { pipe } from "fp-ts/function";
import { either as E, taskEither as TE } from "fp-ts";

interface CatFact {
  _id: string;
  text: string;
}

// Imagine a function that performs an asynchronous operation and may fail.
const fetchCatFacts = (): Promise<CatFact[]> =>
  fetch("https://cat-fact.herokuapp.com/facts").then((res) => res.json());

// Wrap the async operation result in a TaskEither monad.
const fetchCatFactsTE: TE.TaskEither<Error, CatFact[]> = TE.tryCatch(
  fetchCatFacts,
  (err) => new Error(`Whoopsie: ${err}`),
);

// Another function that processes the result of the async operation
const extractFirstCatFact = (facts: CatFact[]): string => facts[0]?.text;

// Function to provide a default value synchronously
const getDefaultCatFact = () => "No cat facts available.";

// Using chain and map (or fold in our case) within a pipe operation
// to unwrap the inner value.
const catFactResult: E.Either<Error, string> = await pipe(
  TE.of(getDefaultCatFact()), // lift the result of getDefaultCatFact into TaskEither context
  TE.chain(() => fetchCatFactsTE), // TaskEither monad with fetch result
  TE.chain((result) => TE.right(extractFirstCatFact(result))), // wrapping in another TaskEither monad
  TE.fold(
    (error) => TE.left(error),
    (result) => TE.right(result),
  ),
)();
// Remember to chain when returning another functor and to map or fold
// when returning a "normal" value.

pipe(
  catFactResult,
  E.fold(
    (err) => console.error(err),
    (result) => console.log(result),
  ),
);
// -> "Owning a cat can reduce the risk of stroke..."
