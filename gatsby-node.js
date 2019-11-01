const Promise = require('bluebird')
const path = require('path')

const years = [
  1950,
  1966,
  1981,
  1996,
  2011
];

const genders = ['male', 'female', 'non-binary'];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const storyPage = path.resolve('./src/templates/story.js')
    const indexPage = path.resolve('./src/templates/yearRange.js')
    const genderPage = path.resolve('./src/templates/gender.js')

    resolve(
      graphql(
        `
          {
            allContentfulStory {
              edges {
                node {
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

        genders.forEach(gender => {
          createPage({
            path: `/gender/${gender}/`,
            component: genderPage,
            context: {
              gender: gender
            },
          })          
        })

        const stories = result.data.allContentfulStory.edges
        stories.forEach((story, index) => {
          createPage({
            path: `/stories/${story.node.slug}/`,
            component: storyPage,
            context: {
              slug: story.node.slug
            },
          })
        })
      })
    )
  })
}
