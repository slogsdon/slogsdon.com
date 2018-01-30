import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ASP.NET Core WebAPI with Azure Application Insights",
  tags: [".net", "csharp", "azure"],
  description: "",
  draft: true,
})(markdown(components)`

* Enable Application Insights during App Service creation
* Add NuGet package
* Update ${<InlineCode>{`Startup.cs`}</InlineCode>}
* Push to App Service
`);
