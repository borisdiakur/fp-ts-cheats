// The Ord type class represents types which
// support comparisons with a total order.

import { number, ord as ORD } from "fp-ts";

type Pick<A> = (x: A, y: A) => A;

const createMinMax = <A>(O: ORD.Ord<A>): Pick<A> => (x, y) =>
  O.compare(x, y) === 1 ? y : x;

const min: <A>(O: ORD.Ord<A>) => Pick<A> = createMinMax;
const max: <A>(O: ORD.Ord<A>) => Pick<A> = (O) => createMinMax(ORD.reverse(O));

type Species = {
  type: string;
  legs: number;
  eyes: number;
};

// using fromCompare
const byLegs: ORD.Ord<Species> = ORD.fromCompare((x, y) => (
  x.legs < y.legs ? -1 : x.legs > y.legs ? 1 : 0
));
// using contramap
const byEyes: ORD.Ord<Species> = ORD.contramap((x: Species) => x.eyes)(number.Ord);

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
