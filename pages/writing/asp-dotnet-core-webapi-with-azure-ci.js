import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ASP.NET Core WebAPI with Azure CI",
  tags: [".net", "csharp", "azure"],
  description: "",
  draft: true,
})(markdown(components)`

* Create VSTS project repo
* Enable App Service with CI
* Link with VSTS
* Push project
* CI runners understand ${<InlineCode>{`project.json`}</InlineCode>} and ${(
  <InlineCode>{`global.json`}</InlineCode>
)} application layouts
* Be careful with IIS Tools above 1.0.0-preview2-final
`);
