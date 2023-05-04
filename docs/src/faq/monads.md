---
title: When To Use Which - Maybe vs Result vs Task (and other Monads)
description: ''
---

There is often confusion about when to use each of these types since they have such similar interfaces.

The first thing to understand about these types is that their similarity is because they are all Monads. All monads will have the same interface, though they may have different uses. In some cases, the difference will be obvious. In some cases, it may be just the difference of intent. We’ll explore these differences by first looking at monads that have obviously different purposes.

## Monads

A Monad is a data abstraction that allows programs to be structured generically. A particular Monad represents a specific form of computation. The consistent interface allows programs to look the same, regardless of the nature of the computation being performed.

We’ll discuss the most commonly used monads in our system here, but there is no real limit to the types of computations that monads can represent. But the goal of the abstraction is to separate the lower-level abstraction from the higher-level abstraction, level the purpose of the code clear.

### Lists (Nonempty Lists)

A List monad is used when we are expecting the result of a computation to be indeterminate. If I ask for people named “Smith”, I may be zero people or I may get 100 people. The key is that I don’t know ahead of time how large the result set of the computation is.

In the case of a non-empty list, the computation is expected to produce at least one result.

### Decoders

A decoder is used when a computation must rely on an unknown data type. With decoders, we can validate unknown data and transform it into something useful in the application context.

### Maybe

Maybe is used for computations that may fail, but the failure either isn’t an error condition, or the reason for the failure isn’t important. For example, using our find function on an array returns a Maybe type, because the value may not be in the array.

Maybe is strongly preferred over using null, undefined, empty string, -1, or any other imperative style representations of computational failure.

### Result

Result is used for computations that may fail, but the reason for the failure is important. Decoders use Result types internally to handle the error reporting.

### Task

A Task is used for computations that may fail and the reason for failure is important. They differ from Results though because it is a lazy abstraction. The computation isn’t run until the Task is forked. This makes Tasks ideal for asynchronous operations.

Tasks are more determinate and have fewer foot guns than Promises.
