const { resolve } = require(`path`)
const fs = require("fs")
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = async ({ actions, graphql }, options) => {
    const { RU, LV } = options
    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPages {
            allWpPage(filter: { language: { locale: { eq: "en_US" } } }) {
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
            if (translation.language.locale === "lv")
                LV[page.id] = translation.id
            else if (translation.language.locale === "ru_RU")
                RU[page.id] = translation.id
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

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "/" : node.uri,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPageId: (allPages[i + 1] || {}).id,
                    previousPageId: (allPages[i - 1] || {}).id,
                    isLastSingle: !!(allPages[i - 1] || {}).id,
                    isFirstSingle: !!(allPages[i + 1] || {}).id,
                },
            })

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? `en/` : `en${node.uri}`,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPageId: (allPages[i + 1] || {}).id,
                    previousPageId: (allPages[i - 1] || {}).id,
                    isLastSingle: !!(allPages[i - 1] || {}).id,
                    isFirstSingle: !!(allPages[i + 1] || {}).id,
                },
            })

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "ru/" : `ru${node.uri}`,
                context: {
                    lang: `ru`,
                    id: RU[node.id],
                    nextPageId: allPages[i + 1]
                        ? RU[allPages[i + 1].id]
                        : {}.id,
                    previousPageId: allPages[i - 1]
                        ? RU[allPages[i - 1].id]
                        : {}.id,
                    isLastSingle: allPages[i - 1]
                        ? !!RU[allPages[i - 1].id]
                        : !!{}.id,
                    isFirstSingle: allPages[i + 1]
                        ? !!RU[allPages[i + 1].id]
                        : !!{}.id,
                },
            })

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "lv/" : `lv${node.uri}`,
                context: {
                    lang: `lv`,
                    id: LV[node.id],
                    nextPageId: allPages[i + 1]
                        ? LV[allPages[i + 1].id]
                        : {}.id,
                    previousPageId: allPages[i - 1]
                        ? LV[allPages[i - 1].id]
                        : {}.id,
                    isLastSingle: allPages[i - 1]
                        ? !!LV[allPages[i - 1].id]
                        : !!{}.id,
                    isFirstSingle: allPages[i + 1]
                        ? !!LV[allPages[i + 1].id]
                        : !!{}.id,
                },
            })
        })
    )
}
