const { resolve } = require(`path`)
const fs = require("fs")
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = async ({ actions, graphql }, options) => {
    const { LV, EN } = options
    const { data } = await graphql(/* GraphQL */ `
        query allDefaultLangPages {
            allWpPage(filter: { language: { locale: { eq: "ru_RU" } } }) {
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

    data.allWpPage.nodes.forEach(page => {
        // let pageId = page.id
        page.translations.forEach(translation => {
            if (translation.language.locale === "lv")
                LV[page.id] = translation.id
            else if (translation.language.locale === "en_US")
                EN[page.id] = translation.id
        })
    })

    await Promise.all(
        data.allWpPage.nodes.map(async (node, i) => {
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
                    id: node.id,
                    nextPageId: (data.allWpPage.nodes[i + 1] || {}).id,
                    previousPageId: (data.allWpPage.nodes[i - 1] || {}).id,
                    isLastSingle: !!(data.allWpPage.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPage.nodes[i + 1] || {}).id,
                },
            })

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? `ru/` : `ru${node.uri}`,
                context: {
                    lang: `ru`,
                    id: node.id,
                    nextPageId: (data.allWpPage.nodes[i + 1] || {}).id,
                    previousPageId: (data.allWpPage.nodes[i - 1] || {}).id,
                    isLastSingle: !!(data.allWpPage.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPage.nodes[i + 1] || {}).id,
                },
            })

            // dump(EN)
            // dump(data.allWpPage.nodes[i + 1].id)
            // dd(EN[data.allWpPage.nodes[i + 1].id])

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "en/" : `en${node.uri}`,
                context: {
                    lang: `en`,
                    id: EN[node.id],
                    nextPageId: data.allWpPage.nodes[i + 1]
                        ? EN[data.allWpPage.nodes[i + 1].id]
                        : !!{}.id,
                    previousPageId: data.allWpPage.nodes[i - 1]
                        ? EN[data.allWpPage.nodes[i - 1].id]
                        : {}.id,
                    isLastSingle: data.allWpPage.nodes[i - 1]
                        ? !!EN[data.allWpPage.nodes[i - 1].id]
                        : !!{}.id,
                    isFirstSingle: data.allWpPage.nodes[i + 1]
                        ? !!EN[data.allWpPage.nodes[i + 1].id]
                        : !!{}.id,
                },
            })

            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "lv/" : `lv${node.uri}`,
                context: {
                    lang: `lv`,
                    id: LV[node.id],
                    nextPageId: data.allWpPage.nodes[i + 1]
                        ? LV[data.allWpPage.nodes[i + 1].id]
                        : !!{}.id,
                    previousPageId: data.allWpPage.nodes[i - 1]
                        ? LV[data.allWpPage.nodes[i - 1].id]
                        : {}.id,
                    isLastSingle: data.allWpPage.nodes[i - 1]
                        ? !!LV[data.allWpPage.nodes[i - 1].id]
                        : !!{}.id,
                    isFirstSingle: data.allWpPage.nodes[i + 1]
                        ? !!LV[data.allWpPage.nodes[i + 1].id]
                        : !!{}.id,
                },
            })
        })
    )
}
