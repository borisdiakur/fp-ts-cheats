// IO<A> represents a non-deterministic synchronous computation that
// can cause side effects, yields a value of type A and never (!) fails.

import { io as IO } from "fp-ts";
import { fromNullable, type Option } from "fp-ts/Option";

// Random values
const random: IO.IO<number> = () => Math.random();
console.info(random()); // -> 0.12346789...

// Synchronous side effects
const getEnvVar = (key: string): IO.IO<Option<string>> => () =>
  fromNullable(process.env[key]);
console.info(getEnvVar("SHELL")()); // -> Some "/bin/zsh"
console.info(getEnvVar("CATDOG")()); // -> None
