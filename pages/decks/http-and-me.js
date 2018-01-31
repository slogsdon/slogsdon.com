import markdown from "markdown-in-js";

import { Code, InlineCode } from "../../components/code";
import withMd, { components } from "../../lib/with-md";

export default withMd({
  title: "HTTP and Me",
  date: "2014-08-11",
  location: "Blackstone Media Lunch-and-Learn (Louisville, KY)",
  tags: ["http", "talk"],
})(markdown(components)`

An introduction to HTTP and how it drives the modern web. Deck was created for and targeted at a lunch and learn for developers, designers, and non-creatives at [Blackstone Media][1] and [StarkNine][2] in Louisville, KY.

${(
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/uCkptOF75II"
    frameborder="0"
    allowfullscreen
  />
)}

${(
  <script
    async
    class="speakerdeck-embed"
    data-id="1bd99480f51a0131d9446ebc6f4da04b"
    data-ratio="1.33333333333333"
    src="//speakerdeck.com/assets/embed.js"
  />
)}

Slides available at [SpeakerDeck][3].

[1]: http://www.blackstonemedia.com/
[2]: http://www.starknine.com/
[3]: https://speakerdeck.com/slogsdon/http-and-me
`);
