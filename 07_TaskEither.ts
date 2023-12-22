// TaskEither<E, A> represents an asynchronous computation
// that either yields a value of type A or fails yielding
// with an error of type E.

import { TaskEither, tryCatch } from "fp-ts/TaskEither";

const catFactsURL = "https://cat-fact.herokuapp.com/facts";
const fetchCatFacts = (): TaskEither<Error, string> =>
  tryCatch(
    () => fetch(catFactsURL).then((res) => res.text()),
    (reason) => new Error("Whoopsi: " + String(reason)),
  );

console.info(await fetchCatFacts()()); // -> Right "[{\"status... or Left error "Whoopsi..."
