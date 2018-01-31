import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import Image from "../../components/image";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "F# Editor Setup with Ionide",
  date: "2016-12-22",
  tags: ["functional programming", ".net", "fsharp"],
  description: "",
  draft: true,
})(markdown(components)`

* [Visual Studio Code](https://code.visualstudio.com/)
* [Atom](http://atom.io/)
* [Ionide](http://ionide.io/)

> Install an extension with command pallette

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-install-extension.png" />
)}

> Search for an extension

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-install-extension-ionide-fsharp.png" />
)}

> Reload once installed

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-installed-extension-ionide-fsharp.png" />
)}

* C#

> Possible prompts shown when loading.NET Core projects

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-dotnet-core-first-load.png" />
)}

> Build and debug assets

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-dotnet-core-build-and-debug-assets.png" />
)}

> Package restore in action

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-dotnet-core-package-restore.png" />
)}

> .NET Core debugger on first load

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-csharp-debugger-first-load.png" />
)}

> .NET Core debugger once installed

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-csharp-debugger-installed.png" />
)}

> .NET Core default debugging targets (${(
  <InlineCode>{`.vscode/launch.json`}</InlineCode>
)})

${(
  <Image src="/static/images/exploring-fsharp-with-dotnet-core/vscode-csharp-debugger-default-targets.png" />
)}

## Comments to be made

* F# is still second-class compared to C# and, to some extent, VB.NET.
* .NET Core tooling is still progressing. Most focus up to this point has been for C#.
`);
