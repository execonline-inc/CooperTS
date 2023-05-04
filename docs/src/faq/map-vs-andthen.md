---
title: When To Use Which - map vs. andThen
description: ''
---

map and andThen are very similar operations and so developers new to functors and monads are often confused about when to apply which operations. The easiest way to make that decision is to allow the types to guide you. But if you are also new to type systems, this is not very helpful advice. So let’s walk through an example following the types.

## The Types

For our contrived example, we’ll assume we are working with a simple library for converting dates to strings and strings to date. This library consists of two functions. Their type signatures are presented here:

```typescript
const dateToString = (date: Date) => string;

const stringToDate = (candidate: string) => Maybe<Date>;
```

Even without the implementations, these type signatures convey a lot of information. The `dateToString` function maps a Date type to a string type, and every Date can be converted to a string. The `stringToDate` function maps a string to a Date, but since it returns `Maybe<Date>` we know that not every string produces a valid date.

## Map

Given that we have a type of `Maybe<Date>`, then we will have functor and monad interfaces with the following type signatures:

```typescript
.map<S>(fn:  (value:  Date)  =>  S):  Maybe<S>

.andThen<S>(fn:  (value:  Date)  =>  Maybe<S>):  Maybe<S>
```

If we are hoping to convert the Date to a string, then we must use `dateToString`. In this scenario, one of these interfaces will never work. Using `dateToString` with `andThen` will not even compile. So our only option here is to use `map`.

Using `dateToString` converts our functor type signature to this:

```typescript
.map<string>(dateToString): Maybe<string>
```

I’m being explicit here, but typescript will infer the return type from the function being passed. So in practice, this can usually just be written as:

```typescript
.map(dateToString)
```

This is what makes functors extremely powerful. We can now use this simple function in any context that is represented by a functor (ie. implements `map`). Result, Task, Decoder, NonEmptyList, Array; this function will work unchanged in any of them.

## AndThen

Given a type of `Maybe<string>`, then we will have functor and monad interfaces with the following type signatures:

```typescript
.map<S>(fn:  (value:  string)  =>  S):  Maybe<S>

.andThen<S>(fn:  (value:  string)  =>  Maybe<S>):  Maybe<S>
```

If we need to convert the string to a Date, then we will need to use our `stringToDate` function. We can use `.map` in this case too, but it may not be what we want. Let’s look at the type signature and see why that might be.

```typescript
.map<Maybe<Date>>(stringToDate):  Maybe<Maybe<Date>>
```

This will compile, but you can see that we have a Maybe type nested within another Maybe. This nesting of a monad within the same type of monad is a red flag for maintainability and clarity. Let’s see what happens when we use the monad interface:

```typescript
.andThen<Date>(stringToDate):  Maybe<Date>
```

This is much easier to maintain. We lose the nesting when we use the monad interface.

The downside to the monad interface is that our `stringToDate` function is specific to Maybe. This requires us to write new versions of the function to work with other monads. However, it is easy enough to convert a Maybe type to other monads as appropriate. In fact, `toResult` and `toTask` helpers already exist for converting between these types.

## Summary

Hopefully, this helps to clarify when it is best to use `map` vs. `andThen`.
