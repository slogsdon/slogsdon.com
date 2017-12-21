import Link from "gatsby-link";
import * as React from "react";
import Helmet from "react-helmet";

import Entry from "../../components/entry";

const styles = require("./index.module.css");

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IDecksPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMarkdownRemark: {
      edges: any[];
    };
  };
}

export default class extends React.Component<IDecksPageProps> {
  public render() {
    return (
      <div>
        <Helmet
          title={"Slide Decks - " + this.props.data.site.siteMetadata.title}
        />

        <h1>Slide Decks</h1>

        {this.props.data.allMarkdownRemark.edges.map((node) => {
          const entry = node.node;
          return (
            <Entry entry={entry} key={entry.fields.slug} styles={styles} />
          );
        })}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query DecksPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(decks)/.*\\.md$/" } }
      limit: 1000
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
