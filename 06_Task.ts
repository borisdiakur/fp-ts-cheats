// Task<A> represents an asynchronous computation
// that yields a value of type A and never fails.

import { task as T } from "fp-ts";

const task: T.Task<string> = () =>
  new Promise<string>((resolve) => {
    const proc = Bun.spawn(["echo", "cat"]);
    new Response(proc.stdout).text().then(resolve);
  });

console.info(await task()); // -> "cat"
