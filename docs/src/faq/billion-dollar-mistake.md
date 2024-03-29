---
title: Avoiding The Billion Dollar Mistake
description: ''
---

Tony Hoare famously called NULL his "billion dollar mistake". In this post, we'll explore what null (and undefined) is, where it came from, and why we feel it is an inappropriate abstraction to use in modern business software development. We'll also explore how to program without null using CooperTS friendly libraries and patterns.

## The Birth of NULL

> I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.
>
> --- Tony Hoare (C.A.R. Hoare)

Null references were originally created as a stand-in value for pointers that don't actually point to valid memory. This effectively breaks early type systems. Since the NULL reference can inhabit any types, the programmer is responsible for checking every single reference to ensure that it is not a NULL reference. So this puts the responsibility of safety and security into the hands of the programmers. regardless of their experience and motivation. In most programming languages, dereferencing a null pointer results in an immediate program crash. This is usually the result of one or more developer assumptions being violated (put a pin in that). This leads to reliability problems, but Null pointer exceptions can also be used by attackers to bypass security checks or produce a core dump, revealing details about the program that can aid future attacks.

Over the years, many programming languages (Java, C#, etc,) have developed safe memory models to reduce the security risks of NULL pointer references, but many of those languages continue to allow NULL references to inhabit any type.

## The Nullable Type

Some programming languages don't specifically support a NULL reference, but instead implement a Nullable type. Ruby, for example, uses NilClass to represent the concept of NULL. A nullable type can be safely dereferenced, but as Ruby developers can attest, you still suffer from reliability problems. Sending an unsupported method to the nullable type still results in an immediate crash.

Many programming languages that support Nullable types also support a "safe" dereference operator. Newer versions of Ruby (>= 2.3), for example, use the &. operator to allow any method to be safely sent to the NilClass object. The problem with this operator is that, while the program doesn't crash, an unexpected Nullable type still represents a violation of developer assumptions. So, while the program may not crash, there is likely still a bug. How this bug will ultimately manifest is undetermined.

## The Null Object Pattern

A user space extension of the Nullable Type that some OO programmers favor is the Null Object pattern. In this pattern, a stand-in object is used to represent the absence of a value. The stand-in object upholds the interface contract of whatever object it stands-in for. Null objects then act as a no-op for side-effectual method calls, and returns a sensible default value for query method calls. Implementing the Null Object pattern across a large code base can lead to a fairly complex object graph. If you decide to go all in on Null Objects, you need to implement Null Objects for all of your business objects and then you also need to keep your null objects implementations in sync with the actual implementation. This is often error prone and tedious.

Another side effect of the Null object pattern is that, from object oriented principles, the caller should not know if it has the Null Object or the real object. But some business decisions are based on knowing if you have Nothing or Something. In this case, you are back to needing to understand the difference between having nothing and having a real value.

## The Optional Type

There is a significant impedance mismatch that comes from trying to use a low level memory abstraction to also represent a high level concept of a missing value. Some language developers (mostly typed languages) acknowledge this by NOT having NULL references and providing an Optional data type. This type is usually called Option or Maybe, depending on the language.

Optional types make the concept of Nothing (None) an explicit and first class value. Any other type can be stored in an Optional type (integers, strings, object, arrays, etc.) And it provides a consistent and reliable interface for getting at the optional values and in the case where the value isn't available, operations against an optional type short circuit, resulting in... Nothing.

Optional types can be composed through their functor or monad interfaces. They encapsulate the nothing checking so that the developer isn't required to remember to perform those checks. It also requires developers to explicitly declare when values can be optional or not, removing the risk that bugs will result from incorrect developer assumptions.

## Rolling with Optional

Rather then relying on the leaky NULL abstraction, we prefer Optional types in CooperTS. It's an explicitly declared type who's intent is to express the concept of Nothing vs. Something. It is preferred for its consistent interface and for the security and reliability taking null checking out of the hands of developers.
