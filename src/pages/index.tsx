import * as React from "react";
import Helmet from "react-helmet";

import Menu from "../components/menu";

const styles = require("./index.module.css");

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
  };
}

export default class extends React.Component<IndexPageProps> {
  public render() {
    const { description, title } = this.props.data.site.siteMetadata;
    return (
      <div className={styles.container}>
        <Helmet title={title} />

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <Menu styles={styles} />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
