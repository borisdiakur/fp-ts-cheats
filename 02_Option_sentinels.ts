// Common "sentinels" are undefined and null.

// Solution: Option, fromNullable

import { pipe } from "fp-ts/lib/function";
import { fromNullable, getOrElse, getOrElseW, type Option } from "fp-ts/Option";

function find<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate));
}

const species = ["cat", "dog", "mouse", "bat", null, undefined];

const isString = (a: unknown): a is string => typeof a === "string";
const isNumber = (a: unknown): a is string => typeof a === "number";
const isUndefined = (a: unknown): a is undefined => a === undefined;
const isNull = (a: unknown): a is null => a === null;

console.info(find(species, isString)); // -> Some cat
console.info(find(species, isNumber)); // -> None
console.info(find(species, isUndefined)); // -> None
console.info(find(species, isNull)); // -> None

// Often we want to unwrap the value and provide a custom fallback value,

// Solution: Option, getOrElse.

function findElseCow<A>(as: Array<A>, predicate: (a: A) => boolean) {
  return pipe(
    find(as, predicate),
    getOrElse(() => 'cow' as A)
  )
}

console.info(findElseCow(species, isString)); // -> "cat"
console.info(findElseCow(species, isNumber)); // -> "cow"

// Sometimes we need to return a different type (widen the type).

// Solution: Option, getOrElseW.

function findElseSymbolCow<A>(as: Array<A>, predicate: (a: A) => boolean) {
  return pipe(
    find(as, predicate),
    getOrElseW(() => Symbol('cow'))
  )
}

console.info(findElseSymbolCow(species, isString)); // -> "cat"
console.info(findElseSymbolCow(species, isNumber)); // -> Symbol("cow")