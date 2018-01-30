import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "ChicagoBoss",
  date: "2013-08-27",
  tags: ["chicagoboss", "erlang"],
})(markdown(components)`

I need to stop finding awesome projects to try out. [Erlang][1] and [ChicagoBoss][2] look pretty freakin' sweet. Have to love some high-performance programming languages matched with a productive web framework.

I'm excited to create a demo project and dive into these. I'll follow up when I do.

[1]: http://www.erlang.org/
[2]: http://www.chicagoboss.org/
`);
