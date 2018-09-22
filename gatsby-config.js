const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Discord_Fork',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'data', 'bots'),
        name: 'bots',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'data', 'docs'),
        name: 'docs',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://discordbots.co.uk`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ],
}