// IOEither<E, A> represents a synchronous computation that either
// yields a value of type A or fails yielding an error of type E.

import fs from "fs";
import { ioEither as IOE } from "fp-ts";

const readFileSync = (path: string): IOE.IOEither<Error, string> =>
  IOE.tryCatch(
    () => fs.readFileSync(path, "utf8"),
    (reason) => new Error("Whoopsie: " + String(reason)),
  );

console.info(readFileSync("cat.gif")()); // -> Left error "Whoopsie..."
console.info(readFileSync("package.json")()); // -> Right "{\n...
