// Validation with fallback validation.

// Solution: Either.orElse

import { flow, identity, pipe } from "fp-ts/function";
import { either as E } from "fp-ts";

interface Animal {
  species: string;
  greeting: string;
}

interface Dog extends Animal {
  species: "dog";
}

interface Cat extends Animal {
  species: "cat";
}

interface Rabbit extends Animal {
  species: "rabbit";
}

const cat: Cat = {
  species: "cat",
  greeting: "Wuff",
};

const dog: Dog = {
  species: "dog",
  greeting: "Wuff",
};

const rabbit: Rabbit = {
  species: "rabbit",
  greeting: "Squeak",
};

const canPurr = flow(
  E.fromPredicate(
    (animal: Animal): animal is Cat => animal.species === "cat",
    (animal) => new Error(`A ${animal.species} can't purr.`),
  ),
  E.map(identity),
);

const canBark = flow(
  E.fromPredicate(
    (animal: Animal): animal is Dog => animal.species === "dog",
    (animal) => new Error(`A ${animal.species} can't bark.`),
  ),
  E.map(identity),
);

const isCatDog = (animal: Animal) =>
  pipe(
    animal,
    canPurr, // validation
    E.orElseW(() => canBark(animal)), // fallback validation
  );

console.info(isCatDog(cat)); // -> Right cat
console.info(isCatDog(dog)); // -> Right dog
console.info(isCatDog(rabbit)); // -> Left error
