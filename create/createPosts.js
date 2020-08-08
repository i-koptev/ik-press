const { resolve } = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPost(sort: { fields: modifiedGmt, order: DESC }) {
                nodes {
                    id
                    uri
                }
            }
        }
    `)

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
        })
    )
}
