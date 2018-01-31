import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ASP.NET Core WebAPI with xUnit.net Test Project",
  tags: [".net", "csharp", "azure"],
  description: "",
  draft: true,
})(markdown(components)`

* Create app project
* Move to ${<InlineCode>{`./src/`}</InlineCode>}
* Create ${<InlineCode>{`global.json`}</InlineCode>}
* Create test project in ${<InlineCode>{`./test/`}</InlineCode>}
* Reference app project in test project
* ${<InlineCode>{`dotnet restore`}</InlineCode>} works from root
* ${<InlineCode>{`dotnet run`}</InlineCode>}/${(
  <InlineCode>{`dotnet test`}</InlineCode>
)} need to be ran from individual project directories
* VSCode Setup
`);
