const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/story.js')
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

        const stories = result.data.allContentfulStory.edges
        stories.forEach((story, index) => {
          console.log(story.node);
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
