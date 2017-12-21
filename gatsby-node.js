const path = require(`path`);
const slash = require(`slash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`);

    // add to below to ignore drafts
    //  filter: { frontmatter: { draft: { ne: true } } }
    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors);
      }

      // Create blog posts pages.

      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug, // required
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.fields.slug,
          }
        });
      });

      resolve();
    });
  });
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`;
    createNodeField({ node, name: `slug`, value: slug });
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent);
    createNodeField({
      node,
      name: `slug`,
      // manually create slug
      // supposed to be in fileNode.fields.slug from graphql,
      // but value is always `undefined`
      value: `/${fileNode.relativeDirectory}/`,
    });
  }
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    if (page.path.match(/^\/$/)) {
      page.layout = "blank";

      // Update the page.
      createPage(page);
    }

    resolve();
  });
};
