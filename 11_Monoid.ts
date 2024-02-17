// The monoid extends the semigroup with an identity value
// which is "neutral" with respect to concat.

import { monoid as M, number as N, option as O, semigroup as SG } from "fp-ts";

type Point = {
  x: number;
  y: number;
};
const monoidPoint: M.Monoid<Point> = M.struct({
  x: N.MonoidSum,
  y: N.MonoidSum,
});

type Vector = {
  from: Point;
  to: Point;
};
const monoidVector: M.Monoid<Vector> = M.struct({
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

console.info(M.concatAll(monoidVector)([vectorA, vectorB]));
// -> { from: { x: 2, y: 2 }, to: { x: 4, y: 7 } }

interface FamPrefs {
  kids: O.Option<number>;
  cats: O.Option<number>;
  dogs: O.Option<number>;
}

const monoidFamPrefs: M.Monoid<FamPrefs> = M.struct<FamPrefs>({
  kids: O.getMonoid(SG.last<number>()),
  cats: O.getMonoid(SG.last<number>()),
  dogs: O.getMonoid(SG.last<number>()),
});
const desiredFamPrefs: FamPrefs = {
  kids: O.some(3),
  cats: O.some(2),
  dogs: O.some(1),
};
const realisticFamPrefs: FamPrefs = {
  kids: O.some(0),
  cats: O.none,
  dogs: O.some(0),
};

/** realistic overrides desired */
const famPrefs = monoidFamPrefs.concat(desiredFamPrefs, realisticFamPrefs);
console.info(famPrefs); // -> some 0 kids, some 2 cats, some 0 dogs
