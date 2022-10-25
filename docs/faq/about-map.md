---
title: What's All This About Map Then?
description: ''
---

## Caveats and Disclaimers

I make no guarantees that the code examples compile or execute. All code examples are syntactically similar to Typescript, but should be treated as pseudo-code. Also, I expect to reference behaviors (methods, etc) that actually don't exist in the JavaScript standard library (though it'd be nice if some of them did). I try to call out where I'm doing this, but really who knows if I got every case. The intent of this is not because I'm lazy (well, not exclusively because I'm lazy), but because I want to emphasize the concepts, and not muddy the waters of learning with the intricacies of the JavaScript implementation reality.

With that out of the way, on to the topic at hand...

## But First... (a Pure Function Primer)

Before we tackle Map and AndThen, we should make sure that we are all on the same page about functions.

In the mathematical sense, a function is just a mapping from a Set of inputs to a Set of outputs. The output for any given input will always be the same. In the programming world, we call these functions "pure" functions. and they are becoming quite popular.

Pure functions are defined by having no side effects and always returning the same value for the same arguments.This idea is often called "referential integrity", which simply means that if you replace your function call with the value returned from the function, your program doesn't break.

Let's take a moment to explore referential integrity. Given this function:

### add2

        const add2 = (n: number) => n + 2;

Then this program:

### referential program 1

        add2(2) === 4;

is identical to this program:

### referential program 2

        4 === 4;

So.. that was probably a tad underwhelming.

Now let's consider a slightly different version of add2.

### side effectual add2

        const add2 = (n: number) => {
          sendEngagement(`Someone added 2 to ${n}`);
          return n + 2;
        }

Now when I replace add2(2) === 4 with 4 === 4, how many Product Managers am I going to have in my inbox in the morning because the add2 engagements are broken? Imagine trying to write tests for both versions of add2. Which one is easier?

The problem with the second version of add2 is that has side effects in addition to the computation we were expecting. Side effects could include mutating inputs, modifying global variables, I/O operations (reading writing to disk, http requests, reading environment variables, etc.). You can't have a meaningful program without side-effects, but a key tenant of CooperTS is that we want to separate our side effects from our business logic. This makes the business logic easier to write and understand, while isolating parts of the code that are going to fail at runtime.

So why did we go through all this just to talk about Map and AndThen? Well, the laws that govern how Map and AndThen work assume that the functions that are passed in are pure. Applying side effectual behaviors using Map and AndThen are generally discouraged as they subvert optimizations and logic that the mapping behavior is applying in the implementation. Map, after, all isn't just a stylistic preference for looping.

With all that out of the way, let's look at Map and AndThen as applied to Arrays.

## The Array

So let's look at a map in the familiar context of an Array.

Before we begin, let's define some types to work with:

### Types.ts

        interface Encoding {
          id: string;
          name: string;
        }

        interface Stream {
          id: string;
          codec: string;
        }

        interface Video {
          encoding: Encoding;
          streams: Stream[]
        }

        const videos: Video[] = // ... assume we initialized this array with videos

Now lets write a couple loops. One that gets all of the encoding ids from the list of videos, and another that gets all the stream ids from the list of videos:

### Get you some encoding ids

        const encodingIds: string[] = [];

        for (let i = 0; i < videos.length; i++) {
          const id = videos[i].encoding.id;
          encodingIds.push(id);
        }

        const streamIds: string[] = [];

        for (let i = 0; i < videos.length; i++) {
          const streams = videos[i].streams;

          for (let j = 0; j < streams.length; j++) {
            const id = streams[j].id;
            streamIds.push(id);
          }
        }

If you read this code honestly, you have to admit that it's mostly loop management and state initialization; low level concepts that muddy up our business concerns.

Now let's extract the "business logic" into some functions:

### Functions.ts

        const getId = <T extends { id: string }>(thing: T): string => thing.id;

        const getStreams = (video: Video): Stream[] => video.streams;

        const getEncoding = (video: Video): Encoding => video.encoding;

And we'll try again:

### Loops redeux

        const encodingIds: string[] = [];

        for (let i = 0; i < videos.length; i++) {
          const id = getId(getEncoding(videos[i]))
          encodingIds.push(id);
        }

        const streamIds: string[] = [];

        for (let i = 0; i < videos.length; i++) {
          const streams = getStreams(videos[i]);

          for (let j = 0; j < streams.length; j++) {
            const id = getId(streams[j]);
            streamIds.push(id);
          }
        }

Is this better? Well, each piece of business logic is much easier to test now. But we're still doing loop maintenance and state management, and depending on how you feel about reading functions vs. dot notation, this might be harder for you to read.

Let's look again at the encoding ids example, this time using map:

### Encoding IDs, Mapped edition

        const encodingIds: string[] = videos
          .map(getEncoding)
          .map(getId);

And that's all she wrote. Loop maintenance is gone. State management is gone. All that's left are the declarations of what the logic is doing.

"So tell me...", you may be thinking. "How does map work?"

Let us now take a look at a hypothetical implementation of map in a hypothetical Array class:

### Map's Guts

        class Array<A> {
          //... a bunch of stuff that makes arrays arrays
          map = <B>(fn: (a: A) => B): Array<B> => {
            const newArray: B[] = [];

            for (let i = 0; i < this.length; i++) {
              const b = fn(this[i]);
              newArray.push(b);
            }

            return newArray;

          }
        }

So that's where all the loop maintenance and state management went!? Indeed. This is the power of map: It abstracts away low level considerations, and surfaces only the business concerns.

Now I want to take a look at the signature of the fn argument in map and compare it to our business logic functions:

### Map Signature

        fn: (a: A) => B

        getId: (thing: T): string

        getStreams: (video: Video): Stream[]

        getEncoding: (video: Video): Encoding

Every single one of our business logic functions is compatible with map. And this will be true of any pure function. As long as it takes a single argument (or can be curried down to take a single argument) then that function can be used with map. And we can see in the array example that map frees up a lot of mental bandwidth, freeing up cycles that were once devoted to tracking loop and state details but can now be applied to solving actual application space problems.

This idea of map abstracting away low level details is powerful. In the array, it hides looping and state mutation. But imagine if all of your ugly, side effectual, state management details could be modeled as mappable data structures. In that world, all of your business logic could be written in easily tested, easily reasoned about, type checkable, pure functions. No mocks. No browser. No environment considerations. WOW!

Of course, when everything seems rosy, there's always something that comes along and throws a wrench in the works. Let's see what happens when we apply map the stream ids case:

### map stream ids

        const streamIds: string[] = videos
          .map(getStreams)
          .map(streams => streams.map(getId));

Ugh... getStreams is breaking my beautiful code. Since it returns an array, I have to nest a map inside another map; abstraction details are leaking out. Also, this won't compile because I've declared that I need a string[], but I'm actually getting a string[][]. Ay caramba!

We could fix the compiler error with something intensely JavaScripty, like this:

### Intense JavaScript

        const tempStreamIds: string[][] = videos
          .map(getStreams)
          .map(streams => streams.map(getId));

        const streamIds: string[] = [].concat.apply([], tempStreamIds);

It should compile now, but so help me... I need to know how JavaScript functions can be applied; the lowest of low level details. Calgon, take me away.

What would be great here, is if we had a function like map, but instead of appending the results of the map function (fn), it concatenated them. What would we call such a function? How about concatMap? Let's look at a hypothetical implementation of concatMap:

### concatMap

        class Array<A> {
          //... a bunch of stuff that makes arrays arrays
          concatMap = <B>(fn: (a: A) => B[]): Array<B> => {
            let newArray: B[] = [];

            for (let i = 0; i < this.length; i++) {
              const bs = fn(this[i]);
              newArray = newArray.concat(bs);
            }

            return newArray;

          }
        }

Heavens to Betsy, that looks a lot like map, doesn't it? The differences are that the fn function argument must return an array, and those arrays are being concatenated, rather then appended.

Well, now that we have concatMap, let's go back and fix our streamIds:

### fixed stream ids

        const streamIds: string[] = videos
          .concatMap(getStreams)
          .map(getId);

Phew... that is so much nicer.

In this section we've seen that map and it's close sibling concatMap are incredibly handy abstractions to have around. They de-emphasize low level details allowing us to re-emphasize business logic. In many cases, that leads to purely functional application logic that is easily tested and easily reasoned about.

That's a lot to take in. Why don't we take a break here and enjoy a Blueberry Acai Diet Coke before moving on to the next section?

## Walk-thru of Map

To make sure we clearly understand what is going on here, let's walk through the map implementation for arrays. Here is the code again...

### Map's Guts

        class Array<A> {
          //... a bunch of stuff that makes arrays arrays
          map = <B>(fn: (a: A) => B): Array<B> => {
            const newArray: B[] = [];

            for (let i = 0; i < this.length; i++) {
              const b = fn(this[i]);
              newArray.push(b);
            }

            return newArray;

          }
        }

Line 4: When we enter into map, the first thing that happens is a new Array is instantiated.

Line 7: Then, we apply fn to each item in the array.

Line 8: The result of that function call is appended to the new array.

Line 11. Then we return the new array.

In the case where the array is empty, the looping logic falls through and we simply return the new, empty array.

## Walk-thru of concatMap

Now we'll do the same walk through, but with concatMap. Here's the code again:

### concatMap

        class Array<A> {
          //... a bunch of stuff that makes arrays arrays
          concatMap = <B>(fn: (a: A) => B[]): Array<B> => {
            let newArray: B[] = [];

            for (let i = 0; i < this.length; i++) {
              const bs = fn(this[i]);
              newArray = newArray.concat(bs);
            }

            return newArray;

          }
        }

Line 4: When we enter into concatMap, we start by create a new array (same as with map)

Line 7: Then we apply fn to each item in the array. In the case of concatMap, the result from fn will be another array.

Line 8: Next we concatenate the array from line 7, onto the new array that we are constructing.

Line 11: Finally, we return our new array, which is flattened out without any nesting.

In the case where the array is empty, the loop logic falls through and the empty array is returned.

## Other Mappable Types

We can now take this understanding of map and concatMap and apply it to other mappable types. For example, let's create a data type that represents an optional value. This is a type that can replace the use of undefined. It encapsulates checks for undefined in one place, and makes it possible to cleanly chain together computations on values that may or may not be available.

Let's start with a simple class definition for Optional:

        class Optional<A> {
          public static some = <A>(value: A) => {
          return new Optional<A>(value);
          }

          public static none = <A>() => {
              return new Optional<A>();
          }

          private value?: A;

          private constructor(value?: A) {
            this.value = value
          }

          // ... more to come

        }

This class has a private value that could be undefined, or it could be some generic type of A.

So far we can construct some value or we can construct a none value, but since the value is private, we can't do anything with it. Let's add a map method first, so we can at least get at the value. As we read this code, try to keep the Array map intuition in mind. The None case is like having an empty array, and the Some case is like having a one item array. Let's write this:

        class Optional<A> {
          // ... constructors and stuff

          map = <B>(fn: (a: A) => B) => {
            return typeof this.value !== 'undefined'
              ? Optional.some(fn(this.value))
              : Optional.none();
          }
        }

Because there is no looping construct here, this logic is a bit more direct. We check if the value is defined. If it is, we apply fn to the value and return it wrapped in a new some. Otherwise, we return none.

The concatMap implementation is equally direct.

        class Optional<A> {
          // ... constructors and stuff

          concatMap = <B>(fn: (a: A) => Optional<B>) => {
            return typeof this.value !== 'undefined'
              ? fn(this.value)
              : Optional.none()
          }
        }

Now we can compose operations that may fail or return no results in the same way we could chain those calls to an array. For example:

        const add = (n1: number) => (n2: number): n => {
          return n1 + n2;
        }

        const safeDiv = (dividend: number) => (divisor: number): Optional<number> => {
          return divisor === 0
            ? Optional.none()
            : Optional.some(dividend / divisor);
        }

        Optional.some(2)
          .map(add(-2))
          .concatMap(safeDiv(4))

Rather then producing NaN, this code will return None if the division fails (divide by zero error). That makes it easier to chain operations together.

## Some Final Notes

We've demonstrated the logic behind map and concatMap in terms of Arrays, so that we can leverage that intuition and apply it to other mappable types. We've even looked at some hypothetical implementations of map and concatMap to help our understanding.

When developing using CooperTS, our default optional value is actually called Maybe. But the logic and implementation details are applicable, only the names have been changed.

Also note, concatMap can be known by many names: bind, chain, flatMap,, >>=, etc. In CooperTS libraries like Maybeasy, Taskarain, and Jsonous, concatMap is named andThen.

And now you know the rest of the story.
