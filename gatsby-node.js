const Promise = require('bluebird')
const path = require('path')

const years = [
  1950,
  1966,
  1981,
  1996,
  2011
];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/story.js')
    const indexPage = path.resolve('./src/templates/yearRange.js')

    resolve(
      graphql(
        `
          {
            allContentfulStory {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        years.forEach((fromYear, idx) => {
          const toYear = years[idx + 1] ? years[idx + 1] - 1 : new Date().getFullYear();
          createPage({
          path: `/years/${fromYear}-${toYear}/`,
          component: indexPage,
          context: {
            fromYear, toYear
          },
        })})

        const stories = result.data.allContentfulStory.edges
        stories.forEach((story, index) => {
          createPage({
            path: `/stories/${story.node.slug}/`,
            component: blogPost,
            context: {
              slug: story.node.slug
            },
          })
        })
      })
    )
  })
}
