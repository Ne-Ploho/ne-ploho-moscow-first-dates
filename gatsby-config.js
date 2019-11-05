require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-svg',
     'gatsby-transformer-sharp',
     'gatsby-plugin-sharp',
     'gatsby-transformer-remark',
     {
       resolve: 'gatsby-source-contentful',
       options: contentfulConfig,
     },
     {
       resolve: 'gatsby-plugin-google-fonts',
       options: {
         fonts: ['Montserrat:400,700'],
         display: 'fallback'
       }
     },
     'gatsby-plugin-styled-components',
     {
       resolve: `gatsby-plugin-manifest`,
       options: {
         name: `Карта первых свиданий Москвы`,
         short_name: `Карта первых свиданий Москвы`,
         start_url: `/`,
         background_color: `#FFFFFF`,
         theme_color: `#FA61B6`,
         display: `standalone`,
       },
     }
  ],
}
