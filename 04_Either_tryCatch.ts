// Either helps us deal with functions that might throw.

import { either as E } from "fp-ts";

const parse1 = (text: string): E.Either<Error, unknown> =>
  E.tryCatch(
    () => JSON.parse(text),
    E.toError,
  );

// Or a bit shorter, since we pass the same parameter to the throwing function:

const parse2 = E.tryCatchK(JSON.parse, E.toError);

// Or, with a custom error and a custom return type (not any in this case):

type JsonParseError = Readonly<{
  type: "JsonParseError";
  error: Error;
}>;
const parse3: (text: string) => E.Either<JsonParseError, unknown> = E.tryCatchK(
  JSON.parse,
  (error) => ({
    type: "JsonParseError",
    error: E.toError(error),
  }),
);

console.info(parse1('{ "species": "cat" }'));
// -> Right { species: "cat" }
console.info(parse2('{ "species": "ca'));
// -> Left Error "SyntaxError: JSON Parse error: Unterminated string..."
console.info(parse3('{ "species": "ca'));
// -> Left JsonParseError "SyntaxError: JSON Parse error: Unterminated string..."
console.info("I still run!");
// -> "I still run!"
