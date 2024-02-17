import * as TE from "fp-ts/lib/TaskEither";

export interface CatFact {
  _id: string;
  text: string;
}

export const fetchRandomCatFact = (): Promise<CatFact> =>
  fetch("https://cat-fact.herokuapp.com/facts/random").then((res) =>
    res.json()
  );

// Wrap the async operation result in a TaskEither monad.
export const fetchRandomCatFactTE = TE.tryCatch(
  fetchRandomCatFact,
  (err) => new Error(`Whoopsie: ${err}`),
);