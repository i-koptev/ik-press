const { resolve } = require(`path`)
const chunk = require(`lodash/chunk`)
const { dd } = require("dumper.js")
const { dump } = require("dumper.js")

module.exports = async ({ actions, graphql }, options) => {
    const { perPage, blogURI } = options

    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPost(sort: { fields: modifiedGmt, order: DESC }) {
                nodes {
                    uri
                    id
                }
            }
        }
    `)

    const chunkedContentNodes = chunk(data.allWpPost.nodes, perPage)

    // dump("First")
    // dump(chunkedContentNodes)
    // dump("Second")
    // dump(chunkedContentNodes[0])
    // dump("Final")

    // dd(chunkedContentNodes[0].map(item => item.id))

    await Promise.all(
        chunkedContentNodes.map(async (nodesChunk, index) => {
            const firstNode = nodesChunk[0]
            const chunkIds = nodesChunk.map(item => item.id)
            await actions.createPage({
                component: resolve(`./src/templates/Blog/Blog.js`),
                path: index === 0 ? blogURI : `${blogURI}page/${index + 1}/`,
                context: {
                    chunkPosts: chunkIds,
                    firstId: firstNode.id,
                    archivePath: blogURI,
                    archiveType: "post",
                    offset: perPage * index,
                    pageNumber: index + 1,
                    totalPages: chunkedContentNodes.length,
                    perPage,
                },
            })
        })
    )
}
