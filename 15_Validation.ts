// Validations are much like Either<E, A>, they represent
// a computation that might fail with an error of type E
// or succeed with a value of type A, but as opposed to
// the usual computations involving Either, they are able
// to collect multiple failures.

import { sequenceT } from "fp-ts/Apply";
import {
  type Either,
  getApplicativeValidation,
  left,
  map,
  mapLeft,
  right,
} from "fp-ts/Either";
import { getSemigroup, type NonEmptyArray } from "fp-ts/NonEmptyArray";
import { pipe } from "fp-ts/lib/function";

// The lift function takes a validation function (check) that
// returns an Either<E, A> and converts it into a function that
// returns Either<NonEmptyArray<E>, A>.
// The purpose is to lift a single error into an array of errors.
function lift<E, A>(
  check: (a: A) => Either<E, A>,
): (a: A) => Either<NonEmptyArray<E>, A> {
  return (a) =>
    pipe(
      check(a),
      mapLeft((a) => [a]),
    );
}

const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left("at least 6 characters");

const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left("at least one capital letter");

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left("at least one number");

const minLengthV = lift(minLength);
const oneCapitalV = lift(oneCapital);
const oneNumberV = lift(oneNumber);

// The validatePassword function combines the lifted validation
// functions using sequenceT from fp-ts/Apply. It creates an
// ApplicativeValidation that accumulates errors in a non-empty array.
// If all validations pass, it returns right(s), otherwise,
// it accumulates the errors in a non-empty array using mapLeft.
// The result is an Either<NonEmptyArray<string>, string>.
function validatePassword(s: string): Either<NonEmptyArray<string>, string> {
  return pipe(
    // getSemigroup is used to create a Semigroup for combining
    // multiple values of the same type.
    // Given a semigroup, the getApplicativeValidation function
    // returns an alternative Applicative instance for Either.
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      minLengthV(s),
      oneCapitalV(s),
      oneNumberV(s),
    ),
    map(() => s), // Transform the result in case all validations pass to right(s).
  );
}

console.info(validatePassword("ab"));
// -> Left ["at least 6 characters", "at least one capital letter", "at least one number"]

console.info(validatePassword("Yolo 123"));
// -> Right "Yolo 123"
