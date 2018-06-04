module Fable.Next

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Helpers.React

module Props =
  /// `Link` can be provided a string or an object capable of
  /// being parsed by the `format` function provided by the Node.js
  /// built-in module `url`. This applies to both `href` and `as`
  /// properties.
  ///
  /// See documentation for object format:
  /// https://nodejs.org/api/url.html#url_url_strings_and_url_objects
  [<Erase>]
  type Url =
    | String of string
    | Object of obj

  type LinkProp =
    /// Where the link points
    | Href of Url
    /// How the link looks
    | As of Url
    /// Flag to trigger URL prefecthing
    | Prefetch of bool
    /// Flag to replace the history state instead of the default push
    /// behavior
    | Replace of bool
    /// Flag to allow URL without running getInitialProps
    | Shallow of bool
    /// Flag to force `Link` to pass the `href` prop to children other
    /// than `<a>` elements
    | PassHref of bool
    interface Props.IProp

  type StyledJsxProp =
    | Jsx of string
    | Global of string
    interface Props.IHTMLProp

[<AllowNullLiteral>]
type IRouter =
  // Properties

  /// The site's pages as a JS object where:
  ///
  /// - the key is the page path
  /// - the value is the component and any related data:
  ///   - props
  ///   - error
  ///   - etc.
  abstract components: obj with get
  /// The current path excluding the query string.
  abstract pathname: string with get
  /// The current route.
  abstract route: string with get
  /// The parsed query string as a JS object. Defaults to `{}`.
  abstract query: obj with get
  /// The actual path (including the query) shows in the browser.
  abstract asPath: string with get

  // Methods

  /// Performs a `pushState` call with the given url.
  abstract push: url: Props.Url * ?``as``: Props.Url * ?options: obj -> unit
  /// Performs a `replaceState` call with the given url.
  abstract replace: url: Props.Url * ?``as``: Props.Url * ?options: obj -> unit
  /// Prefetches the given url.
  abstract prefetch: url: Props.Url -> unit

  // Event handlers
  // routeChangeStart
  // beforeHistoryChange
  // routeChangeComplete
  // routeChangeError

/// Append child elements to the `<head>` of a page.
///
/// See also: https://github.com/zeit/next.js#populating-head
let inline head (children: React.ReactElement list): React.ReactElement =
  createElement(importDefault "next/head", [], children)

/// Enable client-side transitions between routes.
///
/// Note: use `Link` with `Prefetch true` as a prop for maximum performance, in
/// order to link and prefetch in the background at the same time.
///
/// See also: https://github.com/zeit/next.js#with-link
let inline link (props: Props.LinkProp list) (children: React.ReactElement list): React.ReactElement =
  createElement(importDefault "next/link", (keyValueList CaseRules.LowerFirst props), children)

let inline styledJsx (children: React.ReactElement list): React.ReactElement =
  createElement("style", (keyValueList CaseRules.LowerFirst [Props.Jsx "jsx"]), children)
let inline globalStyledJsx (children: React.ReactElement list): React.ReactElement =
  createElement("style", (keyValueList CaseRules.LowerFirst [Props.Jsx "jsx"; Props.Global "global"]), children)

/// Imperative API for client-side transitions between routes.
///
/// See also: https://github.com/zeit/next.js#imperatively
let Router: IRouter = importDefault "next/router"
