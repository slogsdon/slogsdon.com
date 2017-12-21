import Link from "gatsby-link";
import * as React from "react";
import Helmet from "react-helmet";

import Menu from "../components/menu";

const styles = require("./index.module.css");
require("./prism-github.css");

export default ({ children, data }: any) => (
  <div className={styles.container}>
    <Helmet>
      <html lang="en" />
    </Helmet>
    <header>
      <div className={styles.title}>
        <Link to="/">SL</Link>
      </div>
      <Menu styles={styles}/>
      <div className={styles.clearBoth} />
    </header>
    {children()}
  </div>
);

export const pageQuery = graphql`
  query DefaultLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
