---
title: When to Use Which - getOrElse vs getOrElseValue
description: ''
---

The CooperTS monads have two options for extracting a value from the context; `getOrElseValue` and `getOrElse`. These are not interchangeable. Be careful when choosing which one to use.

## getOrElseValue

This method is strict. The value passed to this is evaluated even if it is never needed. This option should be chosen for any value that is less expensive than an anonymous function and has no side effects.

In the context of React component rendering, choosing this can lead to bugs because you could be eagerly instantiating a component that may have side effects.

## getOrElse

This method is lazy. The function passed to this is only evaluated when it is to be used. This is the option for any value that is more expensive than function construction or if the computation has side effects.
