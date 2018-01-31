import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "Beginner's Hands-On with Haskell",
  date: "2016-05-10",
  location: "Louisville Haskell Meetup (Louisville, KY)",
  tags: ["haskell", "talk", "workshop"],
})(markdown(components)`

From the meetup description:

> An interactive workshop for newcomers to Haskell and functional programming.

${(
  <script
    async
    class="speakerdeck-embed"
    data-id="9163c04dbb9d44c7ac2338eea7626557"
    data-ratio="1.77777777777778"
    src="//speakerdeck.com/assets/embed.js"
  />
)}

* [Meetup](https://www.meetup.com/Louisville-Haskell-Meetup/events/230481029/)
`);
