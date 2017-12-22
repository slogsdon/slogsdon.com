const Img = require("gatsby-image").default;
import Link from "gatsby-link";
import * as React from "react";
import Helmet from "react-helmet";

const styles = require("./index.module.css");

export default ({ data }: any) => (
  <main className={styles.container}>
    <Helmet title={"Work - " + data.site.siteMetadata.title} />
    <h1>Work</h1>

    <article className={styles.project}>
      <Img sizes={data.secureSubmitImage.sizes} />
      <h2>
        <a href="https://github.com/hps/heartland-tokenization" target="_blank">
          Secure Submit
        </a>
      </h2>

      <p>
        Heartland Payment System's JavaScript library provides single-use
        tokenization capabilities for card present and card not present
        merchants
      </p>
    </article>

    <article className={styles.project}>
      <Img sizes={data.sapImage.sizes} />
      <h2>
        <a href="https://github.com/slogsdon/sap" target="_blank">
          Sap
        </a>
      </h2>

      <p>
        Toolkit for Elixir web applications to accept and respond to HTTP
        requests by using a decision tree built with combinators.
      </p>
    </article>

    <hr />

    <p>See other contributions under these organizations:</p>

    <ul>
      <li><a href="https://github.com/slogsdon" target="_blank">@slogsdon</a> on GitHub</li>
      <li><a href="https://github.com/hps" target="_blank">@hps</a> on GitHub</li>
      <li><a href="https://github.com/GlobalPayments" target="_blank">@GlobalPayments</a> on GitHub</li>
    </ul>
  </main>
);

export const pageQuery = graphql`
  query WorkPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    secureSubmitImage: imageSharp(id: { regex: "/secure-submit/" }) {
      sizes(maxWidth: 650) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    sapImage: imageSharp(id: { regex: "/sap/" }) {
      sizes(maxWidth: 650) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
