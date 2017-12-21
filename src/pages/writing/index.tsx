import * as React from "react";
import Helmet from "react-helmet";

import Entry from "../../components/entry";

const styles = require("./index.module.css");

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IWritingPageProps {
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

export default class extends React.Component<IWritingPageProps> {
  public render() {
    return (
      <div>
        <Helmet
          title={"Writing - " + this.props.data.site.siteMetadata.title}
        />

        <h1>Writing</h1>

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
  query WritingPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(writing)/.*\\.md$/" }
        frontmatter: { draft: { ne: true } }
      }
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
            description
          }
        }
      }
    }
  }
`;
