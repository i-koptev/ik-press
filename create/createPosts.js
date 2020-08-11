const { resolve } = require(`path`)

module.exports = async ({ actions, graphql }, options) => {
    const { LV, EN } = options
    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPosts {
            allWpPost(
                sort: { fields: modifiedGmt, order: DESC }
                filter: { language: { locale: { eq: "ru_RU" } } }
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

    data.allWpPost.nodes.forEach(post => {
        // let pageId = page.id
        post.translations.forEach(translation => {
            if (translation.language.locale === "lv")
                LV[post.id] = translation.id
            else if (translation.language.locale === "en_US")
                EN[post.id] = translation.id
        })
    })

    await Promise.all(
        data.allWpPost.nodes.map(async (node, i) => {
            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `blog${node.uri}`,
                context: {
                    id: node.id,
                    nextPostId: (data.allWpPost.nodes[i + 1] || {}).id,
                    previousPostId: (data.allWpPost.nodes[i - 1] || {}).id,
                    nextPostUri: (data.allWpPost.nodes[i + 1] || {}).uri,
                    previousPostUri: (data.allWpPost.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPost.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPost.nodes[i + 1] || {}).id,
                },
            })
            /* await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `en/blog${node.uri}`,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPostId: (data.allWpPost.nodes[i + 1] || {}).id,
                    previousPostId: (data.allWpPost.nodes[i - 1] || {}).id,
                    nextPostUri: (data.allWpPost.nodes[i + 1] || {}).uri,
                    previousPostUri: (data.allWpPost.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPost.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPost.nodes[i + 1] || {}).id,
                },
            })
            await actions.createPage({
                component: resolve(`./src/templates/Post/Post.js`),
                path: `ru/blog${node.uri}`,
                context: {
                    lang: `ru`,
                    id: node.id,
                    nextPostId: (data.allWpPost.nodes[i + 1] || {}).id,
                    previousPostId: (data.allWpPost.nodes[i - 1] || {}).id,
                    nextPostUri: (data.allWpPost.nodes[i + 1] || {}).uri,
                    previousPostUri: (data.allWpPost.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPost.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPost.nodes[i + 1] || {}).id,
                },
            }) */
        })
    )
}
