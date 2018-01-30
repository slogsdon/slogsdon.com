import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ASP.NET Core WebAPI and SqlServer with Docker Compose",
  tags: [-".net", -"csharp", -"docker"],
  description: "",
  draft: true,
})(markdown(components)`

* Application project with Docker
* Run SqlServer within Docker
* Setup Docker Compose
`);
