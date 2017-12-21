import * as React from "react";
import Helmet from "react-helmet";

const styles = require("./blog-post.module.css");

interface IBlogPostProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    markdownRemark: {
      html: string;
      frontmatter: {
        date: string;
        title: string;
      };
    };
  };
}

export default class BlogPostTemplate extends React.Component<IBlogPostProps> {
  public render() {
    const { markdownRemark: post } = this.props.data;
    return (
      <div className={styles.entry}>
        <Helmet
          title={
            post.frontmatter.title +
            " - " +
            this.props.data.site.siteMetadata.title
          }
        />

        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
