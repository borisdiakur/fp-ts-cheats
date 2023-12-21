// Common "sentinels" are undefined and null.

// Solution: Option, fromNullable

import { fromNullable, type Option } from "fp-ts/Option";

function find<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate));
}

const animals = ["cat", "dog", "mouse", "bat", null, undefined];

const isString = (a: unknown): a is string => typeof a === "string";
const isNumber = (a: unknown): a is string => typeof a === "number";
const isUndefined = (a: unknown): a is undefined => a === undefined;
const isNull = (a: unknown): a is null => a === null;

console.info(find(animals, isString)); // -> Some cat
console.info(find(animals, isNumber)); // -> None
console.info(find(animals, isUndefined)); // -> None
console.info(find(animals, isNull)); // -> None
