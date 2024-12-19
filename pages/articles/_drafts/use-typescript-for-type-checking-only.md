---
title: Use TypeScript for Type Checking Only
date: 2019-10-11
layout: 'partials::layouts/writing-post'
slug: use-typescript-for-type-checking-only
---

TypeScript has become increasingly popular for adding static typing to JavaScript projects. However, you don't need to fully commit to writing TypeScript to benefit from its powerful type checking capabilities. In this guide, we'll explore how to set up TypeScript alongside your JavaScript codebase, using it purely for type checking while continuing to write standard JavaScript. This approach gives you the best of both worlds: the safety of TypeScript's type system without the need to transform your existing JavaScript workflow.

## Diving in

Let's create a place to develop our new project:

```
$ mkdir our-awesome-new-project && cd $_
```

and have `yarn` create a `package.json` file for us:

```
$ yarn init -y
yarn init v1.17.3
warning The yes flag has been set. This will automatically answer yes to all questions, which may have security implications.
success Saved package.json
✨  Done in 0.13s

$ cat package.json
{
  "name": "our-awesome-new-project",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

Create our `index.js` file to hold our project's code:

```
$ echo "console.log('hi');" >> index.js
```

Use Visual Studio Code as our editor:

```
$ code .
```

[![image 1](/images/use-typescript-for-type-checking-only/1.png)](/images/use-typescript-for-type-checking-only/1.png)

> Optionally, you can use your editor of choice and TypeScript directly, but this won't be covered here.

Do something more exciting than writing to the console:

```diff
- console.log('hi');
+ function add(a, b) {
+   return a + b;
+ }
+
+ add("1", 2);
```

Visual Studio Code uses the presence of a `tsconfig.json` file at the root of the project in order to know we want to use TypeScript. If we add an empty `tsconfig.json`, we see Visual Studio Code is already taking some action:

[![image 2](/images/use-typescript-for-type-checking-only/2.png)](/images/use-typescript-for-type-checking-only/2.png)

> Note: Select `View > Problems` from Visual Studio Code's main menu if the Problems pane isn't yet visible.

By default, TypeScript will look for any `.ts` files, so we need to let TypeScript know that we want to use regular JavaScript files with the `js` extension. We'll create our first compiler option, `allowJs` to achieve this:

> Pro-tip: Visual Studio Code's IntelliSense feature allow's you to explore the possible configuration options for `tsconfig.json`.

```diff
+ {
+   "compilerOptions": {
+     "allowJs": true
+   }
+ }
```

This fixes the `No inputs were found error` but causes another: `Cannot write file '/path/to/our-awesome-new-project/index.js' because it would overwrite input file.`

[![image 3](/images/use-typescript-for-type-checking-only/3.png)](/images/use-typescript-for-type-checking-only/3.png)

Remember, TypeScript expects `.ts` files by default as it wants to compile those `.ts` to `.js` files. When this compilation happens, a hypothetical project:

```
$ tree .
.
├── index.ts
├── package.json
└── tsconfig.json

0 directories, 3 files
```

would become:

```
$ tree .
.
├── index.ts
├── index.js
├── package.json
└── tsconfig.json

0 directories, 4 files
```

TypeScript refers to the creation of the matching `.js` file as "emitting output". In our case, TypeScript wants to create another `index.js` file, but that's not allowed since the file already exists. We can override this behavior by instructing TypeScript to not emit (create) output:

```diff
{
  "compilerOptions": {
+   "noEmit": true,
    "allowJs": true
  }
}
```

Hooray! No more problems.

But, shouldn't it, you know, do something? If you look around, Visual Studio Code shows no visual cues that anything is happening.

Yet again, one of TypeScript's default options is at play.

`allowJs` is one of the compiler options that allow development teams to gradually introduce TypeScript into an existing project. During this transitional process, there may be `.ts` and `.js` source files coexisting together, and to make sure things don't blow up when compiling `.ts` files, TypeScript treats anything defined in `.js` files as the generic `any` type and skips type checking for these files all together.

TypeScript requires us to opt into type checking JavaScript files, which we can accomplish with the `checkJs` compiler option:

```diff
{
  "compilerOptions": {
+   "checkJs": true,
    "noEmit": true,
    "allowJs": true
  }
}
```

With that added, Visual Studio Code now shows dotted underlines (indicating a notice from the TypeScript compiler `tsc`) for our `add` function's parameters:

[![image 4](/images/use-typescript-for-type-checking-only/4.png)](/images/use-typescript-for-type-checking-only/4.png)

```
Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage. ts(7044)
```

Once the basic project requirements have been set in place, Microsoft's own documentation on [type checking JavaScript files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html) can be referenced to document a project with JSDoc comments. These comments allow TypeScript to get further insight into the intended forms and uses of a project's values, methods, and modules, enhancing TypeScript's type checking capabilities.

## Wrapping up

Using TypeScript for type checking JavaScript code offers a pragmatic middle ground for teams who want the benefits of static typing without fully converting their codebase to TypeScript. With just a few configuration options in `tsconfig.json`, you can leverage TypeScript's powerful type system while maintaining your existing JavaScript workflow. This approach is particularly valuable for:

- Large legacy JavaScript projects where a full TypeScript migration isn't feasible
- Teams who want to gradually introduce type safety
- Projects where TypeScript compilation would add unnecessary complexity
- Developers who prefer JavaScript's syntax but want additional type safety

By combining TypeScript's type checker with JSDoc comments, you get many of the benefits of TypeScript - catching type-related bugs early, better IDE support, and improved code documentation - while keeping your build process simple and straightforward. It's a practical stepping stone that can either serve as a permanent solution or as a transitional phase toward full TypeScript adoption.