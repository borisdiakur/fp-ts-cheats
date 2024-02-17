# Glossary

## Category

A category is a pair `(Objects, Morphisms)` where:

- `Objects` is a collection of objects (not in the sense of OPP)
- `Morphisms` is a collection of morphisms (or arrows) between the objects

We write `f: A ⟼ B`, and we say "`f` is a morphism from `A` to `B`".

In a category the following must apply:

- Composition rule
- Associativity rule
- Identity rule

In the context of programming

- Objects are types
- Morphisms are functions
- `∘` is the usual function composition

## Functor

Functors help us compose programs in a general way.

A functor is a data structure (or interface) that implements a `map` function (it's a mappable structure). The `map` function applies a given function to each element inside the functor, preserving the structure of the functor (it _"lifts the data structure to a new context_").

### Applicative Functor

An applicative functor is a _pointed_ functor with an `ap` method.

## Group

A group is a monoid in which each value has a unique inverse: `a x a' = I` and `a' x a = I`
Think of `encrypt` and `decrypt` on a set such as the alphabet.

## Higher-kinded type (HKT)

A higher-kinded type is a type that takes one or more type parameters and produces another type. In TypeScript, it's often associated with generic types.

```ts
// Box is a higher-kinded type.
interface Box<T> {
  value: T;
}

// mapBox is a function that works with the higher-kinded type Box.
function mapBox<U, V>(box: Box<U>, fn: (value: U) => V): Box<V> {
  return { value: fn(box.value) };
}

// Example usage
const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = mapBox(numberBox, (num) => num.toString());

console.log(stringBox); // -> { value: '42' }
```

## Magma

A magma is a set `A` and a closed binary operation: `A x A -> A`

## Monad

> Monads are pointed functors that can flatten.

Which means that a monad is defined by three things:

1. A type constructor M which admits a Functor instance.
2. A function `of` (which provides a way to lift a value into the monadic context) with the following signature:
    ```ts
    of: <A>(a: A) => HKT<M, A>
    ```
3. A function `flatMap` (`chain` in _fp-ts_, to chain together computations that result in a monadic value) with the following signature:
    ```ts
    flatMap: <A, B>(f: (a: A) => HKT<M, B>) => ((ma: HKT<M, A>) => HKT<M, B>)
    ```

The function `of` and `flatMap` must obey the Associativity and Identity rules.

## Monoid

A monoid is a semigroup with identity value I: `a x I = I x a = a`

A monoid is a structure that consists of a set (type of values that the monoid operates on), an associative binary operation (on two elements from the set), and an identity element. Monoids are commonly used to express combining operations, such as `concat`.

## Semigroup

A semigroup is a magma with associativity on the operation: `a x (b x c) = (a x b) x c`

> Semigroups capture the essence of parallelizable operations.

Some examples of semigroups:

- (number, *) where * is the usual multiplication of numbers
- (string, +) where + is the usual concatenation of strings
- (boolean, &&) where && is the usual conjunction 

## Type Classes and Instances (in fp-ts)

In _fp-ts_ type classes are encoded as TypeScript interfaces.

Example: A type class `Eq`, intended to contain types that admit **equality**, is declared in the following way:

```ts
interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

> The type A belongs to type class Eq if there is a function named equal of the appropriate type, defined on it.

You can make any type `A` a member of a given type class `C` by using an instance declaration that defines implementations of all of `C`'s members for the particular type `A`.

In _fp-ts_ instances are encoded as **static** dictionaries.

```ts
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}
```

## Predicate

A Predicate is a function that takes an argument and returns a boolean, indicating whether the argument satisfies a condition.