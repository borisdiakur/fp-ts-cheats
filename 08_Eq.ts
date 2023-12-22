// The Eq type class represents types which support
// decidable equality.

import { type Eq } from "fp-ts/Eq";

type Has<A> = (a: A) => (as: Array<A>) => boolean;
const has = <A>(E: Eq<A>): Has<A> => (a) => (as) =>
  as.some((item) => E.equals(item, a));

type Species = {
  type: "cat" | "dog" | "mouse";
};

const eqSpecies: Eq<Species> = {
  equals: (x, y) => x.type === y.type,
};

const hasSpecies = has(eqSpecies);
const hasCat = hasSpecies({ type: "cat" });
const hasMouse = hasSpecies({ type: "mouse" });

const species: Species[] = [{ type: "dog" }, { type: "cat" }];

console.info(hasCat(species)); // -> true
console.info(hasMouse(species)); // -> false
