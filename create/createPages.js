const { resolve } = require(`path`)
const fs = require("fs")
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = async ({ actions, graphql }) => {
    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPage {
                nodes {
                    id
                    uri
                    slug
                    isFrontPage
                }
            }
        }
    `)

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
                    nextPageUri: (data.allWpPage.nodes[i + 1] || {}).uri,
                    previousPageUri: (data.allWpPage.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPage.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPage.nodes[i + 1] || {}).id,
                },
            })
            /*  await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "/" : `en${node.uri}`,
                context: {
                    lang: `en`,
                    id: node.id,
                    nextPageId: (data.allWpPage.nodes[i + 1] || {}).id,
                    previousPageId: (data.allWpPage.nodes[i - 1] || {}).id,
                    nextPageUri: (data.allWpPage.nodes[i + 1] || {}).uri,
                    previousPageUri: (data.allWpPage.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPage.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPage.nodes[i + 1] || {}).id,
                },
            })
            await actions.createPage({
                component: actualTemplate,
                path: node.isFrontPage ? "/" : `ru${node.uri}`,
                context: {
                    lang: `ru`,
                    id: node.id,
                    nextPageId: (data.allWpPage.nodes[i + 1] || {}).id,
                    previousPageId: (data.allWpPage.nodes[i - 1] || {}).id,
                    nextPageUri: (data.allWpPage.nodes[i + 1] || {}).uri,
                    previousPageUri: (data.allWpPage.nodes[i - 1] || {}).uri,
                    isLastSingle: !!(data.allWpPage.nodes[i - 1] || {}).id,
                    isFirstSingle: !!(data.allWpPage.nodes[i + 1] || {}).id,
                },
            }) */
        })
    )
}
