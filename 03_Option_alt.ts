// Error handling or executing an alternative path.

// Solution: Option.alt

import { pipe } from "fp-ts/function";
import { option as O } from "fp-ts";

interface CatDog {
  species: 'cat' | 'dog'
  greeting: string
}

const cat: CatDog = {
  species: 'cat',
  greeting: 'Miau',
}

const dog: CatDog = {
  species: 'dog',
  greeting: 'Wuff'
}

const canPurr = O.fromPredicate((catDog: CatDog) => catDog.species === 'cat')
const purrGreet = (catDog: CatDog): O.Option<string> =>
  pipe(
    catDog,
    canPurr,
    O.map((cat: CatDog) => `Rrrrr... ${cat.greeting}!`)
  )

const greet = (catDog: CatDog): O.Option<string> =>
  O.some(`${catDog.greeting}!`)

const sayHi = (catDog: CatDog): string =>
  pipe(
    catDog,
    purrGreet,
    O.alt(() => greet(catDog)),
    O.getOrElse(() => '')
  )

console.info(sayHi(cat)); // -> "Rrrrr... Miau!"
console.info(sayHi(dog)); // -> "Wuff!"