// sources:
// 1. https://github.com/TylerBarnes/using-gatsby-source-wordpress-experimental/blob/master/gatsby-node.js
// 2. https://github.com/henrikwirth/gatsby-starter-wordpress-twenty-twenty/blob/master/gatsby-node.js
// mostly ...

const path = require("path")
const glob = require("glob")
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

const createBlog = require(`./create/createBlog`)
const createPosts = require(`./create/createPosts`)
const createPages = require(`./create/createPages`)
// const createContentTypes = require(`./create/createContentTypes`)
// const createCategories = require(`./create/createCategories`)
// const createAuthors = require(`./create/createAuthors`)

const getTemplates = () => {
    const sitePath = path.resolve(`./`)
    return glob.sync(`./src/templates/**/*.js`, { cwd: sitePath })
}
// dd(getTemplates())

// exports.createPagesStatefully = async (
//     { graphql, actions, reporter },
//     options
// ) => {
//     await createPages({ actions, graphql, reporter }, options)
//     await createPosts({ actions, graphql, reporter }, options)
// }

exports.createPages = async props => {
    const { data: wpSettings } = await props.graphql(/* GraphQL */ `
        {
            wp {
                readingSettings {
                    postsPerPage
                }
            }
        }
    `)

    const perPage = wpSettings.wp.readingSettings.postsPerPage || 10
    const blogURI = "/blog/"
    const templates = getTemplates()
    const LV = {}
    const EN = {}

    // await createContentTypes(props, { templates })
    await createBlog(props, { perPage, blogURI })
    await createPosts(props, { EN, LV })
    await createPages(props, { EN, LV })
    // await createCategories(props, { perPage })
    // await createAuthors(props, { perPage })
    dump(EN)
    dump(LV)
}

/* 

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// We do this, because the Avatar doesn't get handled as a File from the gatsby-source plugin yet. This might change in the future.
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WpAvatar: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

*/
