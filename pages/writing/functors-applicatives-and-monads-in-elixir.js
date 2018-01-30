import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Functors, Applicatives, and Monads in Elixir",
  date: "2015-10-04",
  tags: ["elixir", "functional programming", "haskell"],
  image: "side-of-building.jpeg",
  description:
    "Elixir doesn't have native modules for functors, applicatives, and monads. Is it possible to create them? Is it worth it?",
})(markdown(components)`

> **Big ol' note:** By no means am I an expert on any of the below content. I'm currently learning this to the best of my ability and thought to write down my experiences and thoughts with implementing these in Elixir.

We're going to be comparing Elixir protocols with Haskell's type classes using a go-to type for the subject at hand: ${(
  <InlineCode>{`Maybe`}</InlineCode>
)}. The ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} type encapsulates an optional value. A value of type ${(
  <InlineCode>{`Maybe a`}</InlineCode>
)} either contains a value of type ${(
  <InlineCode>{`a`}</InlineCode>
)} (represented as ${(
  <InlineCode>{`Just a`}</InlineCode>
)}), or it is empty (represented as ${(
  <InlineCode>{`Nothing`}</InlineCode>
)}). Here's how Haskell defines the type:

${(
  <Code syntax="haskell">{`
data Maybe a = Just a
             | Nothing
`}</Code>
)}

Because of Elixir's lack of strong typing and type constructors, we define the Elixir version of ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} slightly different:

${(
  <Code syntax="elixir">{`
defmodule Maybe do
  @type t :: %__MODULE__{
    just: term,
    nothing: boolean
  }
  defstruct just: nil,
            nothing: false

  def just(v), do: __MODULE__ |> struct(just: v)
  def nothing, do: __MODULE__ |> struct(nothing: true)
end
`}</Code>
)}

The struct is acting as a wrapper for the values and the module contains some helper functions to act as a pseudo-replacement for Haskell's type constructors. In Elixir, the type ${(
  <InlineCode>{`Maybe a`}</InlineCode>
)} now either contains a value of type ${(
  <InlineCode>{`term`}</InlineCode>
)} (represented as ${(
  <InlineCode>{`Maybe.just(term)`}</InlineCode>
)}) or is empty (represented as ${<InlineCode>{`Maybe.nothing`}</InlineCode>}).

## Functor

Using functors, we can generalize how ${(
  <InlineCode>{`Enum.map`}</InlineCode>
)} works for ${(
  <InlineCode>{`Enumerable`}</InlineCode>
)}s on any data type, including ${(
  <InlineCode>{`Maybe`}</InlineCode>
)}. We can accomplish this by generalizing the action and implementing that action for the desired data types. This generalized action for Functors is known as ${(
  <InlineCode>{`fmap`}</InlineCode>
)}. Take a look at the definition for the ${(
  <InlineCode>{`Functor`}</InlineCode>
)} protocol:

${(
  <Code syntax="elixir">{`
defprotocol Functor do
  @spec fmap(t, (term -> term)) :: t
  def fmap(functor, fun)
end
`}</Code>
)}

and compare it to Haskell's ${<InlineCode>{`Functor`}</InlineCode>} type class:

${(
  <Code syntax="haskell">{`
class Functor f where
    fmap :: (a -> b) -> f a -> f b
`}</Code>
)}

We can start to see similarities between the two purely by looking at the types. Both require a functor and function as arguments. Haskell's ${(
  <InlineCode>{`f a`}</InlineCode>
)} represents a functor with a type constructor of ${(
  <InlineCode>{`a`}</InlineCode>
)}, similar to ${<InlineCode>{`[a]`}</InlineCode>} being a list of ${(
  <InlineCode>{`a`}</InlineCode>
)}s. You may notice that the order of the arguments in both differ. This mostly has to do with how Elixir's Protocol dispatch process works as it looks at the first argument's type in order to dispatch the call to the correct implementation.

Now, any type that wishes to be a functor only needs to implement the ${(
  <InlineCode>{`fmap`}</InlineCode>
)} function, using Elixir's ${(
  <InlineCode>{`defimpl`}</InlineCode>
)} macro or Haskell's ${<InlineCode>{`instance`}</InlineCode>} keyword:

${(
  <Code syntax="elixir">{`
defimpl Functor, for: Maybe do
  def fmap(%{nothing: true} = f, _), do: f
  def fmap(%{just: a}, fun) do
    fun
    |> apply([a])
    |> Maybe.just
  end
end
`}</Code>
)}

${(
  <Code syntax="haskell">{`
instance Functor Maybe  where
    fmap _ Nothing  = Nothing
    fmap f (Just a) = Just (f a)
`}</Code>
)}

While the Haskell version is more concise, they both define the same core functionality. Calling ${(
  <InlineCode>{`fmap`}</InlineCode>
)} on a "nothing" will always return a "nothing", ignoring the function that is passed as well. Calling ${(
  <InlineCode>{`fmap`}</InlineCode>
)} on a value will unwrap the value by pattern matching the ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} functor and applying the passed function on the value.

### Defining and Using Functors

Let's take a look at what this looks like in use:

${(
  <Code syntax="elixir">{`
f0 = fn x -> x + 2 end

Maybe.just(5)      # Define
|> Functor.fmap(f0) # Use
# %Maybe{just: 7, nothing: false}
`}</Code>
)}

Since our functors in Elixir are just simple structs, our "Just 5" value can be defined in the same variety of ways: ${(
  <InlineCode>{`Maybe.just(5)`}</InlineCode>
)}, ${<InlineCode>{`%Maybe{just: 5}`}</InlineCode>}, ${(
  <InlineCode>{`struct(Maybe, just: 5)`}</InlineCode>
)}, etc. The power of the functor comes from the ${(
  <InlineCode>{`Functor`}</InlineCode>
)} protocol. When we want to work with the functor, we pass it to ${(
  <InlineCode>{`fmap/2`}</InlineCode>
)} along with a function, in this case a small anonymous function that adds ${(
  <InlineCode>{`2`}</InlineCode>
)}. From here, Elixir's protocol dispatch takes over, inspecting the functor's type to direct the call to the functor's implementation of ${(
  <InlineCode>{`fmap/2`}</InlineCode>
)}.

The result of ${(
  <InlineCode>{`fmap/2`}</InlineCode>
)} is another functor, so if necessary, we can continue to pipe additional calls to ${(
  <InlineCode>{`fmap/2`}</InlineCode>
)}. At any time during this pipeline, any one of the included functions could potentially return a "nothing" value (${(
  <InlineCode>{`Maybe.nothing`}</InlineCode>
)}) without throwing an error.

${(
  <Code syntax="elixir">{`
f1 = fn x-> x + 2 end
f2 = fn _ -> Maybe.nothing end
f3 = fn x -> x * 3 end

Maybe.just(5)
|> Functor.fmap(f1)
|> Functor.fmap(f2)
|> Functor.fmap(f3)
# %Maybe{just: nil, nothing: true}
`}</Code>
)}

In a real world situation, this allows us to worry less about catching and accounting for possible points of failure since our implementation of ${(
  <InlineCode>{`Functor`}</InlineCode>
)} for ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} already accounts for this case (remember, calling ${(
  <InlineCode>{`fmap`}</InlineCode>
)} on a "nothing" will always return a "nothing").

## Applicative (Functor)

> _I'm going to leave out the Haskell from here until I can figure how to handle a few things better in Elixir._

Applicatives (or more specifically applicative functors) are a special form of ${(
  <InlineCode>{`Functor`}</InlineCode>
)} where the value within the functor is a function.

${(
  <Code syntax="elixir">{`
defprotocol Applicative do
  @spec apply(t, Functor.t) :: t
  def apply(fun, f)
end
defimpl Applicative, for: Maybe do
  def apply(%{nothing: true} = f, _), do: f
  def apply(%{just: fun}, f) do
    f |> Control.Functor.fmap(fun)
  end
end
`}</Code>
)}

${<InlineCode>{`Maybe`}</InlineCode>} is now a ${(
  <InlineCode>{`Functor`}</InlineCode>
)} as well as an ${<InlineCode>{`Applicative`}</InlineCode>}. Again, our ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} implementation of ${(
  <InlineCode>{`Applicative`}</InlineCode>
)} destructures the first argument, returning a "nothing" value if one is present. However, now it is expected that the value in our functor is a function of type ${(
  <InlineCode>{`(term -> term)`}</InlineCode>
)}. Here's an example where this would be useful:

${(
  <Code syntax="elixir">{`
f4 = fn file ->
  case File.stat(file) do
    {:ok, s} ->
      Maybe.just(&(&1 |> magic_function(s))
    {:error, _} ->
      Maybe.nothing
  end
end
`}</Code>
)}

> _I know this is a convoluted example with simpler alternatives. Let me know if you have a better example for this._

In this specific case, we've created a closure over the ${(
  <InlineCode>{`File.Stat`}</InlineCode>
)} variable (${(
  <InlineCode>{`s`}</InlineCode>
)}) using it in an eventual call to our ${(
  <InlineCode>{`magic_function/2`}</InlineCode>
)} function. We only want the call to ${(
  <InlineCode>{`magic_function/2`}</InlineCode>
)} to occur when the file actually exists, so ${(
  <InlineCode>{`Maybe`}</InlineCode>
)} comes in to save the day.

Because our anonymous function is wrapped in a ${(
  <InlineCode>{`Maybe`}</InlineCode>
)}, it might be tricky call this function with another ${(
  <InlineCode>{`Maybe`}</InlineCode>
)}. We could pull out the function manually:

${(
  <Code syntax="elixir">{`
# "something.txt" exists
%Maybe{just: f5} = f4.("something.txt")
`}</Code>
)}

But this would need to be duplicated everywhere it was necessary. There also may be cases where this process would be too cumbersome to carry out manually. Lucky for us, the implementations of ${(
  <InlineCode>{`Applicative.apply/2`}</InlineCode>
)} will handle this for all functors that have it available.

${(
  <Code syntax="elixir">{`
f4.("something.txt")
|> Applicative.apply(Maybe.just(5))
`}</Code>
)}

## Monad

While I definitely don't want to go down the "let's describe what a monad is" road, I will say I've read that it is best to think of a monad as an abstract data type of actions. A list monad represents actions on a list. An IO monad represents actions on IO.

${(
  <Code syntax="elixir">{`
defprotocol Monad do
  @spec bind(t, (term -> t)) :: t
  def bind(m, fun)
end
`}</Code>
)}

Without going into detail just yet on ${(
  <InlineCode>{`Monad`}</InlineCode>
)}, did you notice any similarities to ${(
  <InlineCode>{`Functor`}</InlineCode>
)} and ${(
  <InlineCode>{`Applicative`}</InlineCode>
)}? Here are their typespecs right next to each other (expanding ${(
  <InlineCode>{`Applicative`}</InlineCode>
)}'s to clear it up):

${(
  <Code syntax="elixir">{`
@spec fmap( t, (term -> term)) :: t             # Functor
@spec apply(t [(term -> term)], Functor.t) :: t # Applicative
@spec bind( t, (term -> t)) :: t                # Monad
`}</Code>
)}

They all accept a value and a function to modify that value, returning the type again.

In ${(
  <InlineCode>{`Functor.fmap/2`}</InlineCode>
)}, we take an unwrapped value, apply the function, and return a wrapped result. In ${(
  <InlineCode>{`Applicative.apply/2`}</InlineCode>
)}, we do the same as ${(
  <InlineCode>{`Functor.fmap/2`}</InlineCode>
)}, but the function is wrapped as well as the value. In ${(
  <InlineCode>{`Monad.bind/2`}</InlineCode>
)}, we do the same as ${(
  <InlineCode>{`Functor.fmap/2`}</InlineCode>
)} as well, but the function argument returns the wrapped value opposed to it being wrapped after the fact.

${(
  <Code syntax="elixir">{`
defimpl Monad, for: Maybe do
  def bind(%{nothing: true} = f, _), do: f
  def bind(%{just: v}, fun) do
    fun |> apply([v])
  end
end
`}</Code>
)}

Following the types, the implementation for ${(
  <InlineCode>{`bind/2`}</InlineCode>
)} looks very similar to that of ${<InlineCode>{`fmap/2`}</InlineCode>} and ${(
  <InlineCode>{`apply/2`}</InlineCode>
)} because they are all similar. The difference come down to how the functions receive the data and how it expects the function to transform that data.

## Wrapping Up

In my eyes, it's yet to be determined whether or not Elixir and Erlang really need functors, applicatives, and monads. The data types that follow these protocols can structure things in a way so that they can hide state, side-effects, etc. away from the pure side of the code, and Haskell uses them to it's advantage to become more than just an academic language and to be able to solve real world problems.

But since Elixir is a dynamic language, we don't always have the compiler to tell us what to do. We can add side-effecting code in our pure functions and others would be none the wiser, but typically, Elixir and Erlang developers will hide the same state, side-effects, etc. away into designated actors. There's no need for a ${(
  <InlineCode>{`State`}</InlineCode>
)} monad to maintain state between function calls because we have abstractions around actors like ${(
  <InlineCode>{`GenServer`}</InlineCode>
)} and ${(
  <InlineCode>{`Agent`}</InlineCode>
)} to do this for us, interfacing with those actors by message passing.

I'm going to keep going down this adventurous path for a little while longer, but I don't quite yet see how many cases that I'd use these in lieu of actors.

> If you're interested in seeing the code behind this post, take a look at [${(
  <InlineCode>{`Control`}</InlineCode>
)}][1], an exploratory look into functors, applicatives, and monads for Elixir.

[1]: https://github.com/slogsdon/elixir-control
`);
