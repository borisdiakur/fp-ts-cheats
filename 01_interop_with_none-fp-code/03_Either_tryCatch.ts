import { type Either, tryCatch } from "fp-ts/Either";

function parse(s: string): Either<Error, unknown> {
  return tryCatch(
    () => JSON.parse(s),
    (reason) => new Error("Whoopsi: " + String(reason)),
  );
}

try {
  console.info(parse('{ "animal": "cat" }')); // -> Right { animal: "cat" }
  console.info(parse('{ "animal": "ca')); // -> Left error "Whoopsi..."
  console.info("I still run!");
} catch (err) {
  console.error(err);
}
