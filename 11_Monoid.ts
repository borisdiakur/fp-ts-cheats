// The monoid extends the semigroup with an identity value
// which is "neutral" with respect to concat.

import { concatAll, type Monoid, struct } from "fp-ts/Monoid";
import * as N from "fp-ts/number";
import { getMonoid, none, Option, some } from "fp-ts/Option";
import { last } from "fp-ts/Semigroup";

type Point = {
  x: number;
  y: number;
};
const monoidPoint: Monoid<Point> = struct({
  x: N.MonoidSum,
  y: N.MonoidSum,
});

type Vector = {
  from: Point;
  to: Point;
};
const monoidVector: Monoid<Vector> = struct({
  from: monoidPoint,
  to: monoidPoint,
});

const vectorA: Vector = {
  from: { x: 1, y: 1 },
  to: { x: 2, y: 4 },
};
const vectorB: Vector = {
  from: { x: 1, y: 1 },
  to: { x: 2, y: 3 },
};

console.info(monoidVector.concat(vectorA, vectorB));
// -> { from: { x: 2, y: 2 }, to: { x: 4, y: 7 } }

console.info(concatAll(monoidVector)([vectorA, vectorB]));
// -> { from: { x: 2, y: 2 }, to: { x: 4, y: 7 } }

interface FamPrefs {
  kids: Option<number>;
  cats: Option<number>;
  dogs: Option<number>;
}

const monoidFamPrefs: Monoid<FamPrefs> = struct<FamPrefs>({
  kids: getMonoid(last<number>()),
  cats: getMonoid(last<number>()),
  dogs: getMonoid(last<number>()),
});
const desiredFamPrefs: FamPrefs = {
  kids: some(3),
  cats: some(2),
  dogs: some(1),
};
const realisticFamPrefs: FamPrefs = {
  kids: some(0),
  cats: none,
  dogs: some(0),
};

/** realistic overrides desired */
const famPrefs = monoidFamPrefs.concat(desiredFamPrefs, realisticFamPrefs);
console.info(famPrefs); // -> some 0 kids, some 2 cats, some 0 dogs
