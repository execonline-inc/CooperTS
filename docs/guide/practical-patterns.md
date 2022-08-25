---
title: 'CooperTS - Practical Patterns'
description: 'Patterns we use at ExecOnline'
---

Elm-inspired functional-programming tools in Typescript.

Compilers are great. Let the compiler do the work.

**Types** - Types are how we model the system. For example, this allows us to have the following states in our code: Waiting, Loading, Ready, and Error. It is a good way to model a page load. These types provide interfaces that we have for each of the states and the data we are receiving from the backend. Though they are implemented as interfaces, they are actually abstractions that define how we think about the system.

The Types.ts file is one of the simpler files to work on. Generally, it is good to start with it.  If the Types.ts file is very big, then it may make sense to break it into two or more files within a "Types" folder.

**Decoders** - Decoders form our anti-corruption layer. There are two facets to this responsibility: 1) validating unknown data from external sources (the backend, a web socket, a user, a cookie, etc.); and 2) transforming that data so it fits our application model (the Types).

Within the Types file we define structure that we will need from the backend. In the Decoder, we verify that the JSON matches the types that we defined. They are built in little pieces. For example, a decoder file may only export a single decoder (e.g. StudentsResource). However, the resource decoder will be made up of many decoders within the file. The resource decoder is a payload decoder & Links decoder. Since all links are the exact same, we have one decoder that we reuse for all links. We have a generic resource decoder that we use to create a specific resource decoder from the payload decoder that we have to make ourselves (e.g. StudentStore > Decoder.ts)

**Store** - Technically, stores are just Javascript objects. We use them to model our state machines. The state becomes observable and the transitions become actions. It describes the states that something can be in and the transitions that are possible. For example, our model for page load has the following states: Waiting, Loading, Ready, and Error. Typical transitions are named as our states. We have a 'loading' transition that only begins to do anything if we start from Waiting. If we trigger the  'loading' transition from a Ready state, nothing happens. We write the transitions in lower case and use ‘’ because Transitions are functions in the store.

**Reactions** - This is how we model asynchronous side-effects that are fired in response to observable state transitions. This is how we enforce a separation of concerns between the store, which is purely business logic, and the side-effects, which typically involve lower level abstractions (e.g. http requests). This occurs when we enter a state. It has 1-2 functions. Its main function is 'effect.' It switches from a current state and performs an action depending on the current state. If the current state is Loading, it hits the API and decodes the response.

Both Reactions and Stores are built on Mobx.

**Mobx** - It’s our state manager library that allows us to describe objects as. It creates observable data to tell it that this info that I'm interested in. If it changes please let me know. Tell it all the store that I wrote" is an “observable.” The store will have a state. The store will define some actions that change the state. It can find some computed values that can be built from that state. Reactions is an observer so it runs whenever Mobx runs in the observable state. Our whole app is built through Mobx. They often use observer function calls so that if they render something that is Mobx state they will automatically update when the Mobx state changes. It's an alternative to using React Native's state.
