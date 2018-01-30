import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Introduction to Testing with ExUnit",
  date: "2015-11-10",
  location: "Louisville Elixir Meetup (Louisville, KY)",
  tags: ["elixir", "testing", "talk", "workshop"],
})(markdown(components)`

From the meetup description:

> Bring your laptops for this workshop where we walk through basic testing using ExUnit, Elixir's built-in testing library.

The workshop led participants through [${(
  <InlineCode>{`TestThePlanet`}</InlineCode>
)}](https://github.com/slogsdon/test-the-planet), a module-by-module look into leveraging ExUnit to perform unit and integration testing with Elixir's defacto and built-in testing library ExUnit.

* [Meetup](http://www.meetup.com/Elixir-Louisville/events/226520804/)
`);
