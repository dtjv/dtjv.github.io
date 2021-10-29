---
title: My Todo MVC
date: 2021-02-02
description:
  How I built two implementations of the same app, following the MVC pattern.
draft: false
template: post
---

<!-- intro -->

Today, modern web applications use some flavor of the
[MVC pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
with the aid of a
[client-side framework](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction).
Having missed the pre-frontend framework era, I asked myself if I _really_
understood this foundational pattern? To answer this question, I decided to
build an app that adhered to the basic premise of MVC. This article discusses
key points of my implementation.

<!-- intro -->

- View the [demo](https://dtjv.io/mvc.ts).
- View the [source code](https://github.com/dtjv/mvc.ts).

## MVC Basics

The MVC pattern describes a way to split an application into areas of concern
and how these areas relate to each other. The areas of concern include the data
Model, the View and the Controller.

### Model

The Model represents the application data and the functionality to manage that
data. That functionality maintains data integrity by ensuring data creation and
modification abide by the application rules. The Model is unaware of any other
component in the system - and thus singlular focused on data management.

### View

The View provides a visual representation of the application data. To a degree,
the View must know about the Model. To what degree this knowledge exists depends
on the flavor of the MVC pattern used.

### Controller

In the _traditional_ version, the Controller encapsulates all business logic and
orchestrates communication between the Model, the View and any other components
added to the mix. Alternative implementations of the MVC pattern diminish the
Controller's responsibilities and off-loads functionality to other components.

## So Many Questions! 🧐

The high-level descriptions in the previous section lack clarity on real world
implementation details. As I began to sketch out a rough design for my app, the
following questions came to mind.

- How does the application start?
- Who retrieves initial data?
- How does data get into the Model?
- How does the View get access to data?
- How does user interaction change the Model data?
- Should the View handle user interaction?
- Should the View update the Model?
- Should the Model persist data?
- What is the difference between the Model and application state?

For these implementational details, there are no definitive right or wrong
answers. I realized I needed to choose a direction and build.

## Version 1

In this first version of my todo app, I pass instances of the View, Model and
Store _(yes, a new component - discussed below)_ components into the Controller.
The Controller manages data retrieval, data persistence, and communication
between components.

Below shows the application construction.

```typescript:title=src/v1/index.ts
import { App } from './app'
import { View } from './view'
import { Todos } from './todos'
import { Store } from './store'

const todos = new Todos()
const view = new View(window.document, '#app')
const store = new Store('todos1', localStorage)
const app = new App(todos, view, store)

app.show()
```

### Model (v1)

In this version, a Todo is a type definition - not a class. The Todos _(note the
plural 's')_ class is the application Model and is dead simple, focusing on
creating and managing the in-memory storage of all Todo objects.

```typescript:title=src/v1/todos.ts
export type Todo = {
  id: string
  task: string
  done: boolean
}

export class Todos {
  public insert(props: Pick<Todo, 'task'> & Partial<Todo>): void
  public update(props: Pick<Todo, 'id'> & Partial<Todo>): void
  public remove(todoId: string): void
}
```

### View (v1)

The View renders all Todo objects that are in memory. The View knows about the
Model structure - that is, it knows the Todo properties to render, but it
doesn't communicate to or change the Model. When a user performs an action, the
View executes registered event handlers associated with that user action. Those
event handlers are Controller methods (discussed below).

```typescript:title=src/v1/view.ts
export enum ViewEvents {
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

export type Handler = (props: Partial<Todo>, event?: Event) => void

export class View {
  constructor(private readonly document: Document, rootId: string)

  public registerHandler({
    event,
    handler,
  }: {
    event: ViewEvents
    handler: Handler
  }): void

  public render(todos: Todo[]): void {
```

### Controller (v1)

Again, the Controller orchestrates the app's activities. For example, the code
snippet below is the Controller's event handler that executes when a user clicks
on the `Add Task` button and triggers the View to emit an event to create a
todo.

```typescript:title=src/v1/app.ts
// Controller
export class App {
  // ...✂️snipped for brevity...

  // Tasks:
  // 1. Tell Model to create and insert a new Todo
  // 2. Persist the Model
  // 3. Message the View to update
  handleCreateTodo(props: Partial<Todo>): void {
    if (props.task) {
      this.todos.insert({ task: props.task })
      this.save()
      this.show()
    }
  }
}
```

To keep the View decoupled from the Controller, all Controller event handlers
registered for View events must have the same function signature. (See below).

```typescript:title=src/v1/view.ts
// The Controller communicates to the View via event handlers that follow this
// structure.
export type Handler = (props: Partial<Todo>, event?: Event) => void
```

### Store (v1)

I also introduce a separate component responsible for data persistence. This
design isolates the implementational details of a specific storage system. The
code snippet below shows the Store class implemented for
[`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

```typescript:title=store.ts
export class Store {
  constructor(private readonly key: string, private readonly db: Storage) {}

  get(): unknown[] {
    return JSON.parse(this.db.getItem(this.key) ?? '[]')
  }

  set(data: unknown[]): void {
    this.db.setItem(this.key, JSON.stringify(data))
  }
}
```

In the current design, the Controller makes calls directly to the Store to save
and retrieve data. You'll notice the Store retrieves **all** the data into
memory at once. This begs the question _"What happens when the data amount
exceeds memory capacity or exceeds storage limits?"_

One solution could be to use pagination and store the data across key indices
(assuming the storage limit was per key and not the whole database).

In the event the app exceeded the whole storage limit, I'd need to write a new
Store class that used a different database **and** change the Controller a bit.
The need to swap data stores is not out of the ordinary, but requiring other
code to change to make the swap is not a great design. To ease this transition,
the Store and the Controller should communicate by a defined "contract". As it
stands right now, the Controller and the Store may be too tightly coupled - a
limitation I'll need to fix at another time.

## Version 2

In version 2, the application construction remains largely the same as version
1 - save for one small change to the View constructor. I'll discuss all the
underlying changes next.

```typescript:title=src/v2/index.ts
import { App } from './app'
import { View } from './view'
import { Todos } from './todos'
import { Store } from './store'

const todos = new Todos()
const view = new View(window.document, '#app', todos)
const store = new Store('todos2', localStorage)
const app = new App(todos, view, store)

app.show()
```

### Emitter (v2)

First, I introduce an abstract Emitter class. Emitter gives its subclasses the
ability to call functions registered to events that that subclass emits.

```typescript:title=src/v2/emitter.ts
export abstract class Emitter {
  private readonly listeners: Map<string, Listener[]> = new Map()

  addListener(event: string, listener: Listener): void {
    const listeners = this.listeners.get(event) ?? []
    listeners.push(listener)
    this.listeners.set(event, listeners)
  }

  emit(event: string): void {
    const listeners = this.listeners.get(event) ?? []
    listeners.forEach((listener) => {
      listener()
    })
  }
}
```

To clarify, it helps to understand how the app is conceptually organized. The
following diagram illustrates that the Controller _owns_ the Model (i.e.,
Todos), which in turn _owns_ each Todo.

```
    +--------------------+
    | Controller (App)
    |
    | +----------------+
    | | Model (Todos)
    | |
    | | +--------------+
    | | | Todo A
    | | +--------------+
    | | | Todo B
    | | +--------------+
    +--------------------+
```

Since the Controller(i.e., App Class) manages the persistence of the Model (i.e.
Todos Class), it needs to know when to save Todos. To address this need, the App
registers a function with the Todos to execute when Todos emits a `CHANGE`
event. In addition, Todos registers a function with each Todo to execute when a
Todo emits a `CHANGE` event.

What we've created is a mechanism for events that occur deep in the application
to bubble up and notify top level components that need to take action based on
those events.

With that high level overview of the communication mechanism, let's dive a bit
deeper into the Model, View and Controller.

### Models (v2)

In version 2, the Models are more robust than those in version 1. A Todo is now
a class implementation that encapsulates Todo construction and modifications.
The Todos _(note the plural 's')_, class manages the collection of all Todo
instances. Both classes, collectively called the Model, subclass Emitter and
emit a `CHANGE` event when their internal data change.

The snippet below illustrates the Model event system. Here, the Todo exposes a
`toggle()` method to change the internal state of a Todo. Once changed, the Todo
will execute all functions listening on the `CHANGE` event.

```typescript:title=src/v2/emitter.ts
export class Todo extends Emitter {
  private _done: boolean

  // 1. Flip the `_done` property
  // 2. Call functions registered to the `CHANGE` event
  public toggle() {
    this._done = !this._done
    this.emit(TodoEvents.CHANGE)
  }
}
```

### View (v2)

The View is now injected with the Model at application start-up. User
interaction captured by the View triggers the View to update the Model. With the
Model event system in place, any change to the Model will trigger listener
functions to run.

### Controller (v2)

In this version, the Controller is simple and limited to application setup, data
persistence and messaging the view. Below is the entire Controller class.

```typescript:title=src/v2/app.ts
export class App {
  constructor(
    private readonly _todos: Todos,
    private readonly _view: View,
    private readonly _store: Store
  ) {
    // Setup:
    // 1. Load data into the Model
    // 2. Register a function to run when the Model changes
    this.load()
    this._todos.addListener(TodoEvents.CHANGE, this._onChange.bind(this))
  }

  public load() {
    this._store.get().forEach((todo) => {
      this._todos.insert(new Todo(todo as Todo))
    })
  }

  public show() {
    this._view.render()
  }

  private _save() {
    this._store.set(this._todos.toJSON())
  }

  // Runs when the Model changes:
  // 1. Save the Model
  // 2. Update the View
  private _onChange() {
    this._save()
    this.show()
  }
}
```

## Final Thoughts

The high-level concept of MVC is easy to grasp and can indeed be trivially
implemented. Although the Todo MVC app is now a cliché, this project was a great
exercise in exploring the nuances of the MVC pattern, in making design decisions
in the face of uncertainty and building with TypeScript and the DOM.
