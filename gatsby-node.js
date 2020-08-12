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

const siteLanguages = {
    languages: [`en`, `ru`, `lv`],
    defaultLanguage: `en`,
    locales: {
        ru: `ru_RU`,
        en: `en_US`,
        lv: `lv`,
    },
}
const languageHash = {}
siteLanguages.languages.forEach(item => {
    languageHash[siteLanguages.locales[item]] = {}
})

const allLanguages = siteLanguages.languages
const defaultLanguage = siteLanguages.defaultLanguage
const locales = siteLanguages.locales
const defaultLanguageLocale = siteLanguages.locales[defaultLanguage]

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

    // await createContentTypes(props, { templates })
    await createPosts(props, {
        allLanguages,
        defaultLanguage,
        defaultLanguageLocale,
        locales,
        languageHash,
    })
    await createPages(props, {
        allLanguages,
        defaultLanguage,
        defaultLanguageLocale,
        locales,
        languageHash,
    })
    await createBlog(props, {
        perPage,
        blogURI,
        allLanguages,
        defaultLanguage,
        defaultLanguageLocale,
        locales,
        languageHash,
    }) // order matters: use data from CreatePosts & createPages
    // await createCategories(props, { perPage })
    // await createAuthors(props, { perPage })

    dump("-*-*-*-*-*- ✨✨✨✨✨✨✨✨✨ -*-*-*-*-*-")
    dump("-*-*-*-*-*-      GATSBY-NODE     -*-*-*-*-*-")
    dump("-*-*-*-*-*- ✨✨✨✨✨✨✨✨✨ -*-*-*-*-*-")
    dump("-*-*-*-*-*- LANGUAGE HASH CREATED -*-*-*-*-*-")
    dump("-*-*-*-*-*- ✨✨✨✨✨✨✨✨✨ -*-*-*-*-*-")
    dump(languageHash)
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
