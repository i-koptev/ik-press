const { resolve } = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPage {
                nodes {
                    id
                    uri
                    isFrontPage
                }
            }
        }
    `)

    await Promise.all(
        data.allWpPage.nodes.map(async (node, i) => {
            await actions.createPage({
                component: resolve(`./src/templates/Page/Page.js`),
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
        })
    )
}
