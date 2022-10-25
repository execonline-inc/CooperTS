---
title: Imperative vs Declarative Programming
description: ''
---

## Imperative

Imperative programming refers to a style of programming where programming statements change the state of the program. Imperative style is a bit of a leaky abstraction because it involves manipulating memory. Many developers prefer imperative programming because it appears to grant the developer more control over the execution of the program. It also tends to lead to an interleaving of lower level programming concepts (allocating memory) with higher level concepts (business rules). This can result in a hiding of the actual intent of the code.

C, Java, JavaScript, etc. tend to be imperative programming languages.

## Declarative

Declarative programming refers to a style of programming where higher level expressions describe the behavior of the program without describing the flow control. This style prevents the interleaving of business logic with lower level algorithmic concerns. This makes is easier to swap out implementations and improve the performance at a lower level, without touching the business logic. This valuable separation of concerns can lead to programs that are easier to understand and maintain.

SQL is an example of a declarative language.
