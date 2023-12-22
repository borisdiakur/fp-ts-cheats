// "Sentinels" refers to special values or signals that are used
// to represent certain conditions, often in cases where errors
// or exceptional situations occur.
// Example: -1 in Array.prototype.findIndex()

// Solution: Option

import { none, type Option, some } from "fp-ts/Option";

export function findIndex<A>(
  as: Array<A>,
  predicate: (a: A) => boolean,
): Option<number> {
  const index = as.findIndex(predicate);
  return index === -1 ? none : some(index);
}

const species = ["cat", "dog", "mouse", "bat"];

const fiveLetters = (s: string) => s.length === 5;
const fourLetters = (s: string) => s.length === 4;

console.info(findIndex(species, fiveLetters)); // -> Some 2
console.info(findIndex(species, fourLetters)); // -> None
