import { type Either, tryCatch } from "fp-ts/Either";

function parse(s: string): Either<Error, unknown> {
  return tryCatch(
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
