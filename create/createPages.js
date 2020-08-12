const { resolve } = require(`path`)
const fs = require("fs")
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = async ({ actions, graphql }, options) => {
    const {
        allLanguages,
        defaultLanguage,
        locales,
        defaultLanguageLocale,
        languageHash,
    } = options

    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPages {
            allWpPage(
                filter: { language: { locale: { eq: "${defaultLanguageLocale}" } } }
            ) {
                nodes {
                    id
                    uri
                    slug
                    isFrontPage
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
        allWpPage: { nodes: allPages },
    } = data

    allPages.forEach(page => {
        page.translations.forEach(translation => {
            languageHash[translation.language.locale][page.id] = translation.id
        })
    })

    await Promise.all(
        allPages.map(async (node, i) => {
            const slugCapitalized = capitalize(node.slug)

            const frontPageTemplate = resolve(
                `./src/templates/FrontPage/FrontPage.js`
            )
            const existsFrontPageTemplate = fs.existsSync(frontPageTemplate)

            const customTemplate = resolve(
                `./src/templates/${slugCapitalized}/${slugCapitalized}.js`
            )
            const existsCustomTemplate = fs.existsSync(customTemplate)

            const defaultTemplate = resolve(`./src/templates/Page/Page.js`)

            var actualTemplate = null

            switch (true) {
                case node.isFrontPage && existsFrontPageTemplate:
                    actualTemplate = frontPageTemplate
                    break

                case existsCustomTemplate:
                    actualTemplate = customTemplate
                    break

                default:
                    actualTemplate = defaultTemplate
            }
            for (language of allLanguages) {
                if (language === defaultLanguage) {
                    await actions.createPage({
                        component: actualTemplate,
                        path: node.isFrontPage ? "/" : node.uri,
                        context: {
                            lang: `${language}`,
                            id: node.id,
                            nextPageId: (allPages[i + 1] || {}).id,
                            previousPageId: (allPages[i - 1] || {}).id,
                            isLastSingle: !!(allPages[i - 1] || {}).id,
                            isFirstSingle: !!(allPages[i + 1] || {}).id,
                        },
                    })

                    await actions.createPage({
                        component: actualTemplate,
                        path: node.isFrontPage
                            ? `${language}/`
                            : `${language}${node.uri}`,
                        context: {
                            lang: `${language}`,
                            id: node.id,
                            nextPageId: (allPages[i + 1] || {}).id,
                            previousPageId: (allPages[i - 1] || {}).id,
                            isLastSingle: !!(allPages[i - 1] || {}).id,
                            isFirstSingle: !!(allPages[i + 1] || {}).id,
                        },
                    })
                } else {
                    await actions.createPage({
                        component: actualTemplate,
                        path: node.isFrontPage
                            ? `${language}/`
                            : `${language}${node.uri}`,
                        context: {
                            lang: `${language}`,
                            id: languageHash[locales[language]][node.id],
                            nextPageId: allPages[i + 1]
                                ? languageHash[locales[language]][
                                      allPages[i + 1].id
                                  ]
                                : {}.id,
                            previousPageId: allPages[i - 1]
                                ? languageHash[locales[language]][
                                      allPages[i - 1].id
                                  ]
                                : {}.id,
                            isLastSingle: allPages[i - 1]
                                ? !!languageHash[locales[language]][
                                      allPages[i - 1].id
                                  ]
                                : !!{}.id,
                            isFirstSingle: allPages[i + 1]
                                ? !!languageHash[locales[language]][
                                      allPages[i + 1].id
                                  ]
                                : !!{}.id,
                        },
                    })
                }
            }
        })
    )
}
