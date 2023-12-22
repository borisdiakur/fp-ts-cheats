// The Ord type class represents types which
// support comparisons with a total order.

import { contramap, fromCompare, type Ord, reverse } from "fp-ts/Ord";
import { number } from "fp-ts";

type Pick<A> = (x: A, y: A) => A;

const createMinMax = <A>(O: Ord<A>): Pick<A> => (x, y) =>
  O.compare(x, y) === 1 ? y : x;

const min: <A>(O: Ord<A>) => Pick<A> = createMinMax;
const max: <A>(O: Ord<A>) => Pick<A> = (O) => createMinMax(reverse(O));

type Species = {
  type: string;
  legs: number;
  eyes: number;
};

// using fromCompare
const byLegs: Ord<Species> = fromCompare((x, y) => (
  x.legs < y.legs ? -1 : x.legs > y.legs ? 1 : 0
));
// using contramap
const byEyes: Ord<Species> = contramap((x: Species) => x.eyes)(number.Ord);

const minLegs = min(byLegs);
const maxEyes = max(byEyes);

console.info(
  minLegs(
    { type: "cat", legs: 4, eyes: 2 },
    { type: "human", legs: 2, eyes: 2 },
  ),
); // -> { type: "human", legs: 2, eyes: 2 }

console.info(
  maxEyes(
    { type: "cat", legs: 4, eyes: 2 },
    { type: "spider", legs: 2, eyes: 6 },
  ),
); // -> { type: "spider", legs: 2, eyes: 6 }
