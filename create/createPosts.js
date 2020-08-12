const { resolve } = require(`path`)
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

module.exports = async ({ actions, graphql }, options) => {
    const {
        allLanguages,
        defaultLanguage,
        locales,
        defaultLanguageLocale,
        languageHash,
    } = options
    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPosts {
            allWpPost(
                sort: { fields: modifiedGmt, order: DESC }
                filter: { language: { locale: { eq: "${defaultLanguageLocale}" } } }
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
        post.translations.forEach(translation => {
            languageHash[translation.language.locale][post.id] = translation.id
        })
    })

    await Promise.all(
        allPosts.map(async (node, i) => {
            for (language of allLanguages) {
                if (language === defaultLanguage) {
                    await actions.createPage({
                        component: resolve(`./src/templates/Post/Post.js`),
                        path: `blog${node.uri}`,
                        context: {
                            lang: `${language}`,
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
                        path: `${language}/blog${node.uri}`,
                        context: {
                            lang: `${language}`,
                            id: node.id,
                            nextPostId: (allPosts[i + 1] || {}).id,
                            previousPostId: (allPosts[i - 1] || {}).id,
                            isLastSingle: !!(allPosts[i - 1] || {}).id,
                            isFirstSingle: !!(allPosts[i + 1] || {}).id,
                        },
                    })
                } else {
                    await actions.createPage({
                        component: resolve(`./src/templates/Post/Post.js`),
                        path: `${language}/blog${node.uri}`,
                        context: {
                            lang: `${language}`,
                            id: languageHash[locales[language]][node.id],
                            nextPostId: allPosts[i + 1]
                                ? languageHash[locales[language]][
                                      allPosts[i + 1].id
                                  ]
                                : {}.id,
                            previousPostId: allPosts[i - 1]
                                ? languageHash[locales[language]][
                                      allPosts[i - 1].id
                                  ]
                                : {}.id,

                            isLastSingle: allPosts[i - 1]
                                ? !!languageHash[locales[language]][
                                      allPosts[i - 1].id
                                  ]
                                : !!{}.id,

                            isFirstSingle: allPosts[i + 1]
                                ? !!languageHash[locales[language]][
                                      allPosts[i + 1].id
                                  ]
                                : !!{}.id,
                        },
                    })
                }
            }
        })
    )
}
