---
title: 'CooperTS - Practical Patterns'
description: 'Patterns we use at ExecOnline'
---

# Elm-inspired functional-programming tools in Typescript.

## Introduction
The packages in CooperTS provide many small tools for building safely with Typescript. Additionally,
we follow a consistent component-wide pattern to build safe reactive components as State Machines.
When building a component as a state machine we create four supporting modules: [Types](#types), [Decoders](#decoders), [Stores](#stores), and [Reactions](#reactions).

Compilers are great. Let the compiler do the work.

## Details

### Types
Types are how we model the state machine. A typical component that fetches data from an
API endpoint might have states:

- `Waiting` - The component is waiting for some triggering event before fetching the data
- `Loading` - The component is fetching and decoding the data (see [Decoders](#decoders) below)
- `Ready` - The component successfully fetched the data & decoded the data. This state should
  hold the data from the API; consequently, the type for that data is also generally defined in the
  same `Types` module.
- `Error` - An error happened while fetching or decoding the data

The states are implemented as a [discriminated union]. They are abstractions that define how we
think about the state machine.

[discriminated union]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions

 For example, the above states are a good way to model a page load. These types provide interfaces that we have for each of the states and the data we are receiving from the backend.

The Types.ts file is one of the simpler files to work on. Generally, it is good to start with it.  If the Types.ts file is very big, then it may make sense to break it into two or more files within a "Types" folder.

### Decoders

Decoders form our anti-corruption layer. There are two facets to this responsibility: 1) validating unknown data from external sources (the backend, a web socket, a user, a cookie, etc.); and 2) transforming that data so it fits our application model (the Types).

Within the Types file we define the structure that we will need from the backend. In the Decoder, we verify that the JSON matches the types that we defined. These decoders are built in little pieces. For example, a decoder file might only export a single decoder (e.g. StudentsResource) which is made up of many smaller decoders defined within the file.

[Our resources follow a established pattern]. The resource decoder consists of a payload decoder and a Links decoder. CooperTS provides one decoder for all links and a generic resource decoder. Once we create the payload decoder, we are able to combine it with the generic resource decoder to create a specific resource decoder (e.g. StudentStore > Decoder.ts).

[Our resources follow a established pattern]: https://cooperts.io/packages/resource

### Stores

Stores are Javascript classes. We use them to model our state machines. The state is marked as a Mobx Observable and the transitions as actions. The stores describe the states that our state machines can be in and the transitions that are possible between states. For example, our model for page load has the following states: Waiting, Loading, Ready, and Error. Typical transitions are named after our states. We have a 'loading' transition that only does anything if we start from Waiting. If we trigger the  'loading' transition from a Ready state, nothing happens.

### Reactions

We model asynchronous side-effects that are fired in response to observable state transitions through Reactions. This is how we enforce a separation of concerns between the store, which is purely business logic, and the side-effects, which typically involve lower level abstractions (e.g. http requests). This occurs when a store changes state. It has 1-2 functions. Its main function is 'effect.' It uses a switch statement on the current state to decide what action to perform. If the current state is Loading, it hits the API and decodes the response.

### Mobx

Both Reactions and Stores are [built on Mobx]. Mobx is our state manager library that makes it effortless to respond to state changes. It's an alternative to using React Native's state. "Anything that can be derived from the application state, should be. Automatically."

[built on Mobx]: https://mobx.js.org/README.html
