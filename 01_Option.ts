// "Sentinels" refers to special values or signals that are used
// to represent certain conditions, often in cases where errors
// or exceptional situations occur.
// Example: -1 in Array.prototype.findIndex()

// Solution: Option

import { option as O } from "fp-ts";

export function findIndex<A>(
  as: Array<A>,
  predicate: (a: A) => boolean,
): O.Option<number> {
  const index = as.findIndex(predicate);
  return index === -1 ? O.none : O.some(index);

  // or using O.fromPredicate:
  // return O.fromPredicate((i: number) => i >= 0)(index)
}

const species = ["cat", "dog", "mouse", "bat"];

const fiveLetters = (s: string) => s.length === 5;
const fourLetters = (s: string) => s.length === 4;

console.info(findIndex(species, fiveLetters)); // -> Some 2
console.info(findIndex(species, fourLetters)); // -> None

// Sometimes we need to refine union types.

// Solution: Option.fromPredicate

type Cat = 'cat'
type Dog = 'dog'
type CatDog = Cat | Dog

const isCat = (catDog: CatDog): catDog is Cat => catDog === 'cat'

const getCat = O.fromPredicate(isCat)
console.info(getCat('cat')) // -> Some 'cat'
console.info(getCat('dog')) // -> None