import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Plug, Friend of Web Developers",
  date: "2016-01-12",
  location: "Louisville Elixir Meetup (Louisville, KY)",
  tags: ["elixir", "http", "talk"],
})(markdown(components)`

From the meetup description:

> We'll cover the Plug specification, using the web server adapters, and composing Plug modules/functions into larger web applications

${(
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/-gev84S9_-c"
    frameborder="0"
    allowfullscreen
  />
)}

{<script async class="speakerdeck-embed" data-id="1a5cbc36e345476687f1bbd7d7a6c8a8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>}

* [Meetup](http://www.meetup.com/Elixir-Louisville/events/227947449/)
* [Demo video](https://www.youtube.com/watch?v=tfRD_e-yvOE)
`);
