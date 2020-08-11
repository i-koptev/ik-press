const { resolve } = require(`path`)
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

module.exports = async ({ actions, graphql }, options) => {
    const { RU, LV } = options
    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPosts {
            allWpPost(
                sort: { fields: modifiedGmt, order: DESC }
                filter: { language: { locale: { eq: "en_US" } } }
            ) {
                nodes {
                    id
                    uri
                    translations {
                        id
                        uri
                        language {
                            locale
                        }
                    }
                }
            }
        }
    `)

    const {
        allWpPost: { nodes: allPosts },
    } = data

    allPosts.forEach(post => {
        // let pageId = page.id
        post.translations.forEach(translation => {
            if (translation.language.locale === "ru_RU")
                RU[post.id] = translation.id
            else if (translation.language.locale === "lv")
                LV[post.id] = translation.id
        })
    })

    await Promise.all(
        allPosts.map(async (node, i) => {
            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `blog${node.uri}`,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPostId: (allPosts[i + 1] || {}).id,
                    previousPostId: (allPosts[i - 1] || {}).id,
                    nextPostUri: (allPosts[i + 1] || {}).uri,
                    previousPostUri: (allPosts[i - 1] || {}).uri,
                    isLastSingle: !!(allPosts[i - 1] || {}).id,
                    isFirstSingle: !!(allPosts[i + 1] || {}).id,
                },
            })
            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `en/blog${node.uri}`,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPostId: (allPosts[i + 1] || {}).id,
                    previousPostId: (allPosts[i - 1] || {}).id,
                    isLastSingle: !!(allPosts[i - 1] || {}).id,
                    isFirstSingle: !!(allPosts[i + 1] || {}).id,
                },
            })

            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `ru/blog${node.uri}`,
                context: {
                    lang: `ru`,
                    id: RU[node.id],
                    nextPostId: allPosts[i + 1]
                        ? RU[allPosts[i + 1].id]
                        : {}.id,
                    previousPostId: allPosts[i - 1]
                        ? RU[allPosts[i - 1].id]
                        : {}.id,

                    isLastSingle: allPosts[i - 1]
                        ? !!RU[allPosts[i - 1].id]
                        : !!{}.id,

                    isFirstSingle: allPosts[i + 1]
                        ? !!RU[allPosts[i + 1].id]
                        : !!{}.id,
                },
            })

            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `lv/blog${node.uri}`,
                context: {
                    lang: `lv`,
                    id: LV[node.id],
                    nextPostId: allPosts[i + 1]
                        ? LV[allPosts[i + 1].id]
                        : {}.id,
                    previousPostId: allPosts[i - 1]
                        ? LV[allPosts[i - 1].id]
                        : {}.id,

                    isLastSingle: allPosts[i - 1]
                        ? !!LV[allPosts[i - 1].id]
                        : !!{}.id,

                    isFirstSingle: allPosts[i + 1]
                        ? !!LV[allPosts[i + 1].id]
                        : !!{}.id,
                },
            })
        })
    )
}
