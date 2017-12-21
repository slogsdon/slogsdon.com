module.exports = {
  siteMetadata: {
    title: `Shane Logsdon`,
    description: `I develop things. Sometimes, I write about them here. Let's start a conversation.`,
    siteUrl: `https://shane.logsdon.io`,
  },
  plugins: [
    // `gatsby-plugin-preact`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-images`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-responsive-iframe`,
        ]
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Shane Logsdon",
        short_name: "Shane Logsdon",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "minimal-ui",
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/favicon.ico`,
            sizes: `16x16`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
  ],
};
