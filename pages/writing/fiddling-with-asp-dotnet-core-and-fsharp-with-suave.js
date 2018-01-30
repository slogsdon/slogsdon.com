import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Fiddling with ASP.NET Core and F# with Suave",
  date: "2017-01-22",
  tags: [".net", "fsharp"],
  description:
    "Suave is a possible replacement for the ASP.NET stack, but with some help, the " +
    "two can be used together to build composable F# web applications.",
})(markdown(components)`

ASP.NET is a great framework for building web applications. It's tried and trusted, fully extensible, has a great community, and thanks to .NET Core, supported across Linux, MacOS, and Windows. Being built with .NET, we have the wise option of building our application with F#, but without intervention, we'd be stuck with using the object-oriented C# types that are throughout ASP.NET.

## The Setup

To overcome this, we'll leverage [Suave](https://suave.io/), which can be a full replacement for ASP.NET, and [${(
  <InlineCode>{`Suave.AspNetCore`}</InlineCode>
)}](https://github.com/dustinmoris/Suave.AspNetCore) to tie the two together. Let's start with a generated project thanks to [${(
  <InlineCode>{`yo aspnet`}</InlineCode>
)}](https://github.com/OmniSharp/generator-aspnet) and the ${(
  <InlineCode>{`Web API Application (F#)`}</InlineCode>
)} template it provides, stripping out some of the template's defaults to have a blank slate. We'll still have some of that object-oriented C# feel, but it will be restricted to the console application:

${(
  <Code syntax="fsharp">{`
open System.IO
open Microsoft.Extensions.Configuration
open Microsoft.AspNetCore.Hosting
open ProjectName

[<EntryPoint>]
let main argv =
  let config = ConfigurationBuilder()
                  .AddCommandLine(argv)
                  .AddEnvironmentVariables("ASPNETCORE_")
                  .Build()

  let host = WebHostBuilder()
                  .UseConfiguration(config)
                  .UseKestrel()
                  .UseContentRoot(Directory.GetCurrentDirectory())
                  .UseIISIntegration()
                  .UseStartup<Http.Startup>()
                  .Build()
  host.Run()
  0 // exit code
`}</Code>
)}

and a minimal ${<InlineCode>{`Startup`}</InlineCode>} class:

${(
  <Code syntax="fsharp">{`
namespace ProjectName

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Logging
open Suave.AspNetCore

module Http =
  type Startup() =
    member this.ConfigureServices (services : IServiceCollection) = ()

    member this.Configure (app : IApplicationBuilder, env : IHostingEnvironment, loggerFactory : ILoggerFactory) =
      app.UseSuave(App.app) |> ignore
`}</Code>
)}

${<InlineCode>{`Suave.AspNetCore`}</InlineCode>} exposes a ${(
  <InlineCode>{`UseSuave`}</InlineCode>
)} extension method on ASP.NET's ${(
  <InlineCode>{`ApplicationBuilder`}</InlineCode>
)} that acts as the connection point between ASP.NET and Suave. Overall, ${(
  <InlineCode>{`Suave.AspNetCore`}</InlineCode>
)} accomplishes this connection through two main pieces:

1. A ${(
  <InlineCode>{`SuaveMiddleware`}</InlineCode>
)} that implements [ASP.NET Middleware](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware)'s method signatures
2. A bi-directional mapping between ASP.NET's ${(
  <InlineCode>{`HttpContext`}</InlineCode>
)} and Suave's ${<InlineCode>{`HttpContext`}</InlineCode>}

We can use Suave's API to control request/response pipeline from here, sticking to full F# and Suave's ${(
  <InlineCode>{`HttpContext`}</InlineCode>
)} (opposed to the ASP.NET ${<InlineCode>{`HttpContext`}</InlineCode>}).

## Why all this trouble?

We're going through this setup to leverage one of Suave's core principles: the ${(
  <InlineCode>{`WebPart`}</InlineCode>
)}. From Suave's documentation:

> A web part is a thing that acts on a HttpContext, the web part could fail by returning ${(
  <InlineCode>{`None`}</InlineCode>
)} or succeed and produce a new HttpContext. Each web part can execute asynchronously, and it’s not until it is evaluated that the async is evaluated. It will be evaluated on the same fibre (asynchronous execution context) that is consuming from the browser’s TCP socket.

${(
  <InlineCode>{`WebPart`}</InlineCode>
)}s give two benefits, composability (combining small pieces into larger ones) and asynchronism (which also aids in composability). In essence, it's type boils down to this (which is useful to know as your editor may display either the left-hand side or the right-hand side depending on how F# infers the type for a given expression):

${(
  <Code syntax="fsharp">{`
type WebPart = HttpContext -> Async<HttpContext option>
`}</Code>
)}

where each ${<InlineCode>{`WebPart`}</InlineCode>} accepts Suave's ${(
  <InlineCode>{`HttpContext`}</InlineCode>
)} and returns an async option. The option is what gives applications the ability to control execution flow. When execution of a code path should stop, the ${(
  <InlineCode>{`WebPart`}</InlineCode>
)} will return ${(
  <InlineCode>{`None`}</InlineCode>
)}, but otherwise, it will return ${(
  <InlineCode>{`Some httpContext`}</InlineCode>
)} with a new ${(
  <InlineCode>{`HttpContext`}</InlineCode>
)} with any desired updates. Because this process is wrapped in ${(
  <InlineCode>{`async`}</InlineCode>
)}, we aren't penalized too much as our application decides how to handle an incoming request.

> One note to make is that instead of F#'s normal function composition operator (${(
  <InlineCode>{`>>`}</InlineCode>
)}), Suave exposes a fish operator (${(
  <InlineCode>{`>=>`}</InlineCode>
)}) to aid in working with ${(
  <InlineCode>{`WebPart`}</InlineCode>
)}s and removes some necessary handling of ${(
  <InlineCode>{`Async<HttpContext option>`}</InlineCode>
)} that aids developer productivity. We'll see this operator in action later on as we build up our application.

## Composing an application

For now, let's just begin with a small starter ${(
  <InlineCode>{`WebPart`}</InlineCode>
)}, thanks to ${<InlineCode>{`OK`}</InlineCode>}:

${(
  <Code syntax="fsharp">{`
namepsace ProjectName

open Suave
open Helpers
open Suave.Filters
open Suave.Operators
open Suave.RequestErrors
open Suave.Successful

module App =
  let hello name = OK ("hello " + name)
  let app = hello "world"
`}</Code>
)}

As our application grows, we'll use ${(
  <InlineCode>{`choose`}</InlineCode>
)} to facilitate paths a request may take and ${(
  <InlineCode>{`path`}</InlineCode>
)} to filter part of the decision tree based on request path. Here, we add some basic routes:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let app =
    choose [
      path "/" >=> hello "world"
      path "/api" >=> NO_CONTENT
      path "/api/users" >=> OK "users"
    ]
`}</Code>
)}

Not only can we use these combinators to create a decision tree to route requests, we can also create a ${(
  <InlineCode>{`WebPart`}</InlineCode>
)}s to set a header or affect the context other ways:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let setServerHeader =
    Writers.setHeader "server" "kestrel + suave"

  let app =
    setServerHeader
    >=> choose [
      // ...
    ]
`}</Code>
)}

We've added ${<InlineCode>{`setServerHeader`}</InlineCode>} in our ${(
  <InlineCode>{`app`}</InlineCode>
)} expression at the top level, but it would be just as happy deeper in the expression. ${(
  <InlineCode>{`path`}</InlineCode>
)} can prevent further combinators from affecting the response, so if ${(
  <InlineCode>{`setServerHeader`}</InlineCode>
)} is added after a ${(
  <InlineCode>{`path`}</InlineCode>
)} expression (or some similar combinator), the response will only have the header set if that part of the decision tree is successfull. For instance, with:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let app =
    choose [
      path "/server" >=> setServerHeader >=> OK "server"
      path "/no-server" >=> OK "no-server"
    ]
`}</Code>
)}

responses for ${<InlineCode>{`/server`}</InlineCode>} will have the ${(
  <InlineCode>{`Server`}</InlineCode>
)} header set with the value ${(
  <InlineCode>{`kestrel + suave`}</InlineCode>
)}, while responses for ${(
  <InlineCode>{`/no-server`}</InlineCode>
)} will have the default value set for the ${(
  <InlineCode>{`Server`}</InlineCode>
)} header, thanks to the ${(
  <InlineCode>{`WebPart`}</InlineCode>
)} type (remember, it returns an ${(
  <InlineCode>{`Async<HttpContext option>`}</InlineCode>
)}).

We can also use ${(
  <InlineCode>{`WebPart`}</InlineCode>
)}s to compose multiple application segments, introducing some order as our application grows:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let api =
    Writers.setMimeType """application/json; charset="utf-8";"""
    >=> choose [
          path "/api" >=> NO_CONTENT
          path "/api/users" >=> OK """{"api": "users"}"""
        ]

  let web =
    choose [
      path "/" >=> hello "world"
      pathScan "/hello/%s" hello
    ]

  let app = [ api; web; ]
`}</Code>
)}

## Iterating improvements

Let's see if we can clean up ${(
  <InlineCode>{`api`}</InlineCode>
)} to remove some duplication. I saw this pattern out on the web at some point:

${(
  <Code syntax="fsharp">{`
module Paths =
  module Api =
    let root = "/api"
    let users = root + "/users"

module App =
  // ...

  let api =
    Writers.setMimeType """application/json; charset="utf-8";"""
    >=> choose [
          path Paths.Api.root >=> NO_CONTENT
          path Paths.Api.users >=> OK """{"api": "users"}"""
        ]

  // ...
`}</Code>
)}

I like the separation here, but honestly, I'm not sure it helps the situation much. We still have a similar problem, plus the additional code for managing the paths. Still not acceptable in my book, so lets try something else. My next inclination is to attempt to nest ${(
  <InlineCode>{`path`}</InlineCode>
)} expressions:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let api =
    Writers.setMimeType """application/json; charset="utf-8";"""
    >=> path "/api"
    >=> choose [
          path "" >=> NO_CONTENT
          path "/users" >=> OK """{"api": "users"}"""
        ]

  // ...
`}</Code>
)}

Sadly, this doesn't work as expected and results in a ${(
  <InlineCode>{`404 Not Found`}</InlineCode>
)}. I wasn't lucky in looking for an official solution yet, but are custom combinators an option? Let's try to build one. Here's what ${(
  <InlineCode>{`path`}</InlineCode>
)}'s implementation looks like:

${(
  <Code syntax="fsharp">{`
let path s (x : HttpContext) =
  // ${(
    <InlineCode>{`iff`}</InlineCode>
  )} was internalized to simplify for display here
  let iff b x =
    if b then Some x else None
  async.Return (iff (s = x.request.path) x)
`}</Code>
)}

Essentially, it checks the path given to ${(
  <InlineCode>{`path`}</InlineCode>
)} against the request's path, returning ${(
  <InlineCode>{`None`}</InlineCode>
)} if there's no match. For our custom combinators, we'll need to check the request path against the string passed to our new ${(
  <InlineCode>{`path`}</InlineCode>
)} as well as the path set above it. ${(
  <InlineCode>{`HttpContext`}</InlineCode>
)} has a ${(
  <InlineCode>{`userState`}</InlineCode>
)} field, meant for storing state information within a single request, perfect for our use-case of storing info about the entire path for a given code path. Here are our new combinators:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let optionally pred value =
    if pred then Some value else None

  let getCurrentRoot ctx =
    match ctx.userState.TryFind("rootPath") with
    | None -> ""
    | Some p -> string p

  let rootPath (part : string) (ctx : HttpContext) =
    let root = getCurrentRoot ctx
    { ctx with userState = ctx.userState.Add("rootPath", root + part) }
    |> Some
    |> async.Return

  let subPath (part : string) (ctx : HttpContext) =
    let fullPath = (getCurrentRoot ctx) + part
    ctx
    |> optionally (fullPath = ctx.request.path)
    |> async.Return

  // ...
`}</Code>
)}

${(
  <InlineCode>{`rootPath`}</InlineCode>
)} allows us to specify a path prefix for ${(
  <InlineCode>{`subPath`}</InlineCode>
)} calls specified deeper in the decision tree. Because ${(
  <InlineCode>{`rootPath`}</InlineCode>
)} stores any previous root path concatenated with the supplied value, we luckily get nesting support beyond a single level. Here's a simple example, clearing up our previous ${(
  <InlineCode>{`api`}</InlineCode>
)} expression:

${(
  <Code syntax="fsharp">{`
module App =
  // ...

  let api =
    Writers.setMimeType """application/json; charset="utf-8";"""
    >=> rootPath "/api"
    >=> choose [
          subPath "" >=> NO_CONTENT
          subPath "/users" >=> OK """{"api": "users"}"""
        ]

  // ...
`}</Code>
)}

> I'm looking to contribute this functionality for inclusion into Suave's API and am currently [awating feedback from the team](https://github.com/SuaveIO/suave/issues/570).

## Take aways

.NET Core is still relatively new when compared to the mainstream .NET Framework. Because of this, Suave's support for it is still in progress (only two of seven additional official packages provide .NET Core support), and community extension of its .NET Core support is still improving (${(
  <InlineCode>{`Suave.AspNetCore`}</InlineCode>
)} doesn't yet support all of Suave's feature set). As the community progress .NET Core support for F# and its projects, this relative newness feeling should diminish, and Suave + F# applications on the ASP.NET Core stack should be ready for production.

That being said, there's no reason Suave cannot be used with ASP.NET Core in projects where 100% compatibility isn't required. Personal projects, one-off projects, etc. would, in my opinion, give you a chance to use Suave and ASP.NET Core together in a lower-risk situation.
`);
