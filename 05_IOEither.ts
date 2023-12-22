// IOEither<E, A> represents a synchronous computation that either
// yields a value of type A or fails yielding an error of type E.

import fs from "fs";
import { type IOEither, tryCatch } from "fp-ts/IOEither";

const readFileSync = (path: string): IOEither<Error, string> =>
  tryCatch(
    () => fs.readFileSync(path, "utf8"),
    (reason) => new Error("Whoopsi: " + String(reason)),
  );

console.info(readFileSync("cat.gif")()); // -> Left error "Whoopsi..."
console.info(readFileSync("package.json")()); // -> Right "{\n...
