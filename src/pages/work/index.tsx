const Img = require("gatsby-image").default;
import Link from "gatsby-link";
import * as React from "react";
import Helmet from "react-helmet";

const styles = require("./index.module.css");

export default ({ data }: any) => (
  <div className={styles.container}>
    <Helmet title={"Work - " + data.site.siteMetadata.title} />
    <h1>Work</h1>

    <article className={styles.project}>
      <Img
        sizes={data.secureSubmitImage.sizes}
        resolutions={data.secureSubmitImage.resolutions}
      />
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
  </div>
);

export const pageQuery = graphql`
  query WorkPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    secureSubmitImage: imageSharp(id: { regex: "/secure-submit/" }) {
      resolutions {
        height
        width
      }
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
