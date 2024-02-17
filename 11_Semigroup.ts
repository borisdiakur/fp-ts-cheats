// Semigroups help us "concat", "merge", or "combine"
// (whatever word gives you the best intuition)
// several values into one.

import { semigroup as SG } from "fp-ts";

type Species = {
  type: string;
};

const semigroupMutant: SG.Semigroup<Species> = {
  concat: (x, y) => ({ type: x.type + y.type }),
};

const bat: Species = { type: "bat" };
const cat: Species = { type: "cat" };
const dog: Species = { type: "dog" };

console.info(semigroupMutant.concat(bat, cat)); // -> { type: "batcat" }
console.info(semigroupMutant.concat(bat, dog)); // -> { type: "batdoc" }

// The default type never forces you to define a type when using the semigroup.
const firstSemigroup = <A = never>(): SG.Semigroup<A> => ({
  concat: (x, _y) => x,
});

const firstSpeciesSemigroup = firstSemigroup<Species>();

console.info(firstSpeciesSemigroup.concat({ type: "cat" }, { type: "dog" })); // -> { type: "cat" }

const arraySemigroup = <A = never>(): SG.Semigroup<Array<A>> => ({
  concat: (x, y) => x.concat(y),
});
const speciesArraySemigroup: SG.Semigroup<Species[]> = arraySemigroup<Species>();

console.info(speciesArraySemigroup.concat([cat], [dog])); // -> [{ type: "cat" }, { type: "dog" }]
