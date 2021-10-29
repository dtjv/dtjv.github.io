---
title: The Generic Tree Data Structure
date: 2021-06-01
description:
draft: false
template: post
---

<!-- intro -->

For good measure, I periodically review fundamental programming concepts - in
particular, algorithms and data structures. In this article, I'd like to walk
through my design and implementation of a generic tree data structure.

<!-- intro -->

- View the
  [source code](https://github.com/dtjv/blog-demos/blob/main/the-generic-tree-data-structure).

## Prerequisites

You'll need [Node.js](https://nodejs.org) to run the code and either
[npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install
dependencies. I have the following versions installed as of this writing.

- node v16.2.0
- yarn v1.22.10

_For what it's worth, I use [fnm](https://github.com/Schniz/fnm) to manage my
Node versions. My terminal initializes faster than the times I used
[nvm](https://github.com/nvm-sh/nvm)._

## Setup

To begin, I'll initialize a project and install the dependencies needed to get
up and running.

```bash
$ mkdir ds && cd ds
$ npm init -y
$ yarn add -D typescript ts-node @types/node
```

In `package.json`, add the `dev` script below.

```json:title=package.json
{
  "scripts": {
    "dev": "ts-node"
  }
}
```

Next, create a default `tsconfig.json` via the command below.

```bash
$ npx tsc --init
```

I'll create a simple program and run it to ensure all is working.

```bash
$ {
echo 'const f = (x: number): number => x + x'
echo 'console.log(f(5))'
} >> test.ts
$ yarn dev test.ts
```

Running that command should print `10` to the console. _If you followed along,
you can remove the `test.ts` file now_.

## The `Tree` Class

A generic tree is a hierarchical data structure based at a root node that
branches to an arbitrary number of child nodes, which in turn each branch to an
arbitrary number of child nodes and so on. Nodes without children are _leaf_
nodes. Below are depictions of an empty and non-empty tree.

```bash
# An empty tree
root -> null

# A non-empty tree
root -> A -> B -> E
          -> C
          -> D -> F
               -> G
```

In the non-empty tree example above, the `root` node, `A`, has three children,
`B`, `C`, `D`. Child `B` has one child and child `D` has two children. Nodes
`C`, `E`, `F` and `G` are leaf nodes.

A tree data structure is a _recursive_ data structure, which means the whole
structure is a composition of smaller versions of the same structure. In the
first example above, `root` is a leaf node and in the second example, node `D`
is the _root_ node for children nodes `F` and `G`. This structural
characteristic allows problem solving algorithms to work on smaller portions of
the tree in a recursive manner. We'll see examples of this a little later.

Let's define an interface to describe a node structure that holds any data value
and access to the node's children.

```typescript:title=tree.ts
interface TreeNode<T> {
  data: T
  children: Tree<T>[]
}
```

`TreeNode` is a generic interface, which provides flexibility for an object of
type `TreeNode` to store any value datatype. You'll notice the `children`
property is an array of type `Tree`. `Tree` is the class we'll define next. But
it's important to note, `children` of type `Tree` is how the data structure gets
its recursive characteristic.

```typescript:title=tree.ts
// ...snipped for brevity...

export class Tree<T> {
  private root: TreeNode<T> | undefined = undefined
}
```

`Tree` is a generic class, which allows its nodes to hold any value datatype.
New `Tree` construction automatically sets the `root` property to `undefined`,
thus making the tree empty by default.

With TypeScript, I can annotate the code to improve clarity of the code's
functionality and intent. Above, its clear the `root` property of a populated
`Tree` will point to an object of type `TreeNode` - an object with a `data`
property and access to its children nodes via the `children` property.

In contrast to the above interface and class definitions, a JavaScript version
would look like this:

```javascript
// not much information and `root` is accessible to the outside!
class Tree {
  root = undefined
}
```

Again, using TypeScript, the type checker provides guardrails to ensure our code
is more robust with fewer trivial errors like accessing an `undefined` object or
reaching into a class instance for internal property values that should be
private.

In the next section, I'll write the `insert` method.

## The `insert` Method

The process to add nodes to the tree addresses two scenarios:

1. If the tree is empty, set the root node
1. If the tree is not empty, create and append a child node to the tree's list
   of children nodes.

The big takeaway here is in scenario 2 - a child node is actually a new instance
of `Tree`. By default, that new child node is an empty tree, so calling the
`insert` method on the child will fall to scenario 1 - setting the child's root
node and returning the child, which is then appended to the parent tree's list
of children nodes.

```typescript:title=tree.ts
// ...snipped for brevity...

class Tree<T> {
  private root: TreeNode<T> | undefined = undefined

  public insert(data: T): Tree<T> {
    // scenario 1
    if (!this.root) {
      this.root = { data, children: [] }
      return this
    }

    // scenario 2
    const child = new Tree<T>()

    this.root.children.push(child.insert(data))
    return child
  }
}
```

At this point, we can construct and populate a generic tree. Import the `util`
package at the top of `tree.ts`.

```typescript:title=tree.ts
import util from 'util'

// ...snipped for brevity...
```

Next, append the following driver code to the bottom of `tree.ts`.

```typescript:title=tree.ts

// ...snipped for brevity...

const tree = new Tree<string>()
const d0: Tree<string>[] = []
const d1: Tree<string>[] = []
const d2: Tree<string>[] = []

// depth 0
d0.push(tree.insert('A'))

// depth 1
d1.push(tree.insert('B'))
d1.push(tree.insert('C'))
d1.push(tree.insert('D'))

// depth 2
d2.push(d1[0].insert('E'))
d2.push(d1[2].insert('F'))
d2.push(d1[2].insert('G'))

console.log(util.inspect(tree, false, null, true))
```

To add child nodes to child nodes, I store references to child nodes (i.e.
`Tree` instances) returned by the `insert` method. These stored `Tree`
references provide access to the `insert` method to nest instances of `Tree` as
children.

Executing the driver code above should print the following to the console:

```bash
$ yarn dev src/tree.ts
Tree {
  root: {
    data: 'A',
    children: [
      Tree {
        root: {
          data: 'B',
          children: [ Tree { root: { data: 'E', children: [] } } ]
        }
      },
      Tree { root: { data: 'C', children: [] } },
      Tree {
        root: {
          data: 'D',
          children: [
            Tree { root: { data: 'F', children: [] } },
            Tree { root: { data: 'G', children: [] } }
          ]
        }
      }
    ]
  }
}
```

## The `remove` Method

The remove method seeks to remove all nodes with a data value that matches the
`data` parameter by structure and value - not by reference. To handle the deep
value matching for data objects, I import the `isEqual` function from
[`lodash`](https://lodash.com).

For a non-empty tree, the `replace` method sets nodes to `undefined` when their
data matches the `data` parameter. This includes the root node. A node removed
also removes references to that node's children - effectively deleting the
entire subtree.

To remove all target nodes, the `remove` method checks the entire tree by
recursively calling each child node's `remove` method. The recursive calls end
when the logic reaches leaf nodes and there are no more children nodes to check.

```typescript:title=tree.ts
import isEqual from 'lodash.isequal'

// ...snipped for brevity...

class Tree<T> {
  private root: TreeNode<T> | undefined = undefined

  // ...snipped for brevity...

  public remove(data: T): void {
    if (!this.root) return

    if (isEqual(this.root.data, data)) {
      this.root = undefined
      return
    }

    this.root.children = this.root.children.filter(
      (child) => !isEqual(child.root?.data, data)
    )
    this.root.children.forEach((child) => child.remove(data))
  }
}
```

## The `toArray` Method

Printing the tree object to the console is not the best way to inspect the
correctness of tree operations like `insert` and `remove`. I decided to write a
method that extracts the tree's data into an array - a `.toArray` method. This
method presents the opportunity to traverse the tree in one of two ways - either
by breadth first or depth first order.

At the top of `tree.ts`, I use the keyword `enum` to define a set of named
constants that creates a set of distinct ways to traverse the tree. I review
each traversal method in the following sub-sections.

```typescript:title=tree.ts
export enum Traversals {
  PRE_ORDER,
  POST_ORDER,
  LEVEL_ORDER,
}
```

Next, I define the `toArray` method with one optional parameter to specify the
desired tree traversal method - the default set to `LEVEL_ORDER` (i.e.
breadth-first traversal). You may notice, `toArray` branches to the
corresponding method to do the actual work of _walking_ the tree. These
traversal _helper_ methods are implementational details of the `toArray` method
and thus marked `private`.

```typescript:title=tree.ts
// ...snipped for brevity...

class Tree<T> {
  // ...snipped for brevity...

  public toArray(traversal: Traversals = Traversals.LEVEL_ORDER): T[] {
    switch (traversal) {
      case Traversals.PRE_ORDER:
        return this.traversePreOrder(this.root)
      case Traversals.POST_ORDER:
        return this.traversePostOrder(this.root)
      default:
        return this.traverseLevelOrder(this.root)
    }
  }
}
```

### Level-Order Traversal

Level-Order traversal processes all nodes of a given depth before descending the
tree to process the nodes of the next deeper level. Using our previous example
from above, node `A` is at the 1st level, nodes, `B`, `C` and `D` are at level 2
and so on.

```bash
level:  1    2    3

root -> A -> B -> E
          -> C
          -> D -> F
               -> G
```

The traversal algorithm begins by placing the root node into a
[queue](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>). Then, it
processes nodes in the queue by first popping the root node out of the queue and
placing its data value into an array. The next step adds each child of the
processed node to the queue. The cycle to process nodes off the queue and add
its children to the queue continues until there are no children nodes to add and
the queue is empty.

```typescript:title=tree.ts
// ...snipped for brevity...

class Tree<T> {
  // ...snipped for brevity...

  private traverseLevelOrder(root: TreeNode<T> | undefined): T[] {
    const result: T[] = []
    const queue: (TreeNode<T> | undefined)[] = [root]

    while (queue.length) {
      const node = queue.pop()

      if (node) {
        result.push(node.data)

        for (const child of node.children) {
          queue.unshift(child.root)
        }
      }
    }

    return result
  }
}
```

Given the original driver code, I add the following line to print the resulting
array.

```typescript:title=tree.ts
// ...snipped for brevity...

console.log(tree.toArray())
```

And the output is `[ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]`. You can see, all node
data values of a level display before nodes of deeper levels.

### Pre-Order and Post-Order Traversal

Pre-Order and Post-Order traversal methods are varieties of a depth-first
approach to _walking_ a tree. They differ in the processing order of the root
node in relation to the node's children. As you might guess, Pre-Order traversal
first processes the root node, then processes its children - which recursively
applies the same logic to each child - process the root, then all its children
and so on. Post-Order traversal processes the _children_ **before** the root
node.

Below are the two depth-first, private methods.

```typescript:title=tree.ts
// ...snipped for brevity...

class Tree<T> {
  // ...snipped for brevity...

  private traversePreOrder(root: TreeNode<T> | undefined): T[] {
    if (!root) return []

    return [
      root.data,
      ...root.children.flatMap((child) => child.traversePreOrder(child.root)),
    ]
  }

  private traversePostOrder(root: TreeNode<T> | undefined): T[] {
    if (!root) return []

    return [
      ...root.children.flatMap((child) => child.traversePostOrder(child.root)),
      root.data,
    ]
  }
}
```

To test this new functionality, add the following two lines to the driver code.

```typescript:title=tree.ts
// ...snipped for brevity...

console.log(tree.toArray(Traversals.PRE_ORDER))
console.log(tree.toArray(Traversals.POST_ORDER))
```

Running the code should produce the following output (I've add comments for
clarification).

```bash
$ yarn dev src/tree.ts

# PRE_ORDER
[ 'A', 'B', 'E', 'C', 'D', 'F', 'G' ]

# POST_ORDER
[ 'E', 'B', 'C', 'F', 'G', 'D', 'A' ]
```

With the `toArray` method complete, unit tests can use the `Tree` class' public
interface to verify a tree's contents. This avoids tests relying on
implementational details for validation checks.

## Wrap-up

I've shared my basic, generic tree implementation. I leave it to you to add
methods of interest, like calculating the height of a node, calculating the
depth of a node, determining the closest common ancestor of two nodes - the list
goes on.

My intent for this article was to focus on the implementational details of the
generic tree class and avoid the rabbit hole of excess tooling. But, I'd be
remiss if I didn't at least mention a more robust development setup.

I use [vim](https://www.vim.org/) as my IDE, which runs a TypeScript language
server via [coc-tsserver](https://github.com/neoclide/coc-tsserver). My
`tsconfig.json` file enables strict type checking. I also installed
[ESlint](https://eslint.org/) to add linting rules.

You can see my project details in this
[repo](https://github.com/dtjv/blog-demos/blob/main/the-generic-tree-data-structure).
Note, I removed the _driver_ code from `tree.ts` and placed it into `main.ts`.

Thanks for reading.
