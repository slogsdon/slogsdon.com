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
        modified?: string;
      };
    };
  };
}

export default class BlogPostTemplate extends React.Component<IBlogPostProps> {
  public render() {
    const { markdownRemark: post } = this.props.data;
    return (
      <main className={styles.entry}>
        <Helmet
          title={
            post.frontmatter.title +
            " - " +
            this.props.data.site.siteMetadata.title
          }
        />

        <header>
          <h1>{post.frontmatter.title}</h1>
          <div className={styles.date}>
            <time>{post.frontmatter.date}</time>
            {` `}
            {post.frontmatter.modified && (
              <time>Updated: {post.frontmatter.modified}</time>
            )}
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
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
        modified(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
