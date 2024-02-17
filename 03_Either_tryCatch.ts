import { either as E } from "fp-ts";

function parse(s: string): E.Either<Error, unknown> {
  return E.tryCatch(
    () => JSON.parse(s),
    (reason) => new Error("Whoopsie: " + String(reason)),
  );
}

try {
  console.info(parse('{ "species": "cat" }')); // -> Right { species: "cat" }
  console.info(parse('{ "species": "ca')); // -> Left error "Whoopsie..."
  console.info("I still run!");
} catch (err) {
  console.error(err);
}
