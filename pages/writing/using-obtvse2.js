import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Using obtvse2",
  date: "2013-08-06",
  tags: ["obtvse2", "ruby"],
})(markdown(components)`

I will be using [obtvse2][1] for the forseeable future. I might finish up my scriptogram clone and release it yet, but I've got other plans for my time at the moment.

[1]: https://github.com/natew/obtvse2
`);
