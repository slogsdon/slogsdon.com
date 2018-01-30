import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ASP.NET Core WebAPI with Entity Framework Core",
  tags: [".net", "csharp", "azure"],
  description: "",
  draft: true,
})(markdown(components)`

* Add NuGet packages
* Create Model(s)
* Create DbContext
* Update ${<InlineCode>{`Startup.cs`}</InlineCode>} in ${(
  <InlineCode>{`ConfigureServices`}</InlineCode>
)}
* Create initial migration
* Update database
* Leverage in controller
`);
