// Functors help us compose programs in a general way.
// A functor is a data structure (or interface) that
// implements a map function (it's a mappable structure).
// The map function applies a given function to each
// element inside the functor, preserving the structure
// of the functor and lifting it to a new context.

import { option as O, functor as F } from "fp-ts";

// Define a constant URI with the value "Response" and a type
// with the same name to represent the type of the functor.
const URI = "Response";
type URI = typeof URI;

// HKT stands for "Higher-Kinded Type". It's often used to
// represent type constructors that take a type argument.
// Here we extend the module declaration for "fp-ts/HKT"
// to include a mapping from the Response URI to its kind.
declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    Response: Response<A>;
  }
}

interface Response<A> {
  url: string;
  status: number;
  headers: Headers;
  body: A;
}

// This is the functor instance for `Response`. It allows us to use
// the map function on values of type Response<A> to transform their
// bodies while keeping the other properties unchanged.
export const functorResponse: F.Functor1<URI> = {
  URI,
  // The map function takes a Response<A> and a function f: (a: A) => B
  // and returns a new Response<B> where the body property is transformed
  // using the function f.
  map: <A, B>(fa: Response<A>, f: (a: A) => B): Response<B> => ({
    ...fa,
    body: f(fa.body),
  }),
};

interface CatFact {
  _id: string;
  text: string;
}

const fetchCatFacts = async (): Promise<Response<CatFact[]>> => {
  const catFactsURL = "https://cat-fact.herokuapp.com/facts";
  const response = await fetch(catFactsURL);
  const data = await response.json();

  return {
    url: catFactsURL,
    status: response.status,
    headers: response.headers,
    body: data,
  };
};

const apiResponse: Response<CatFact[]> = await fetchCatFacts();

const extractFirstCatFact = (facts: CatFact[]): O.Option<string> =>
  O.fromNullable(facts[0]?.text);

// Use functorResponse.map to transform the body of the API response.
const transformedResponse: Response<O.Option<string>> = functorResponse.map(
  apiResponse,
  extractFirstCatFact,
);

console.info(transformedResponse.body);
// -> Some "Owning a cat can reduce the risk of stroke..."
