import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ pageContext, data }) => (
    <>
        <pre>
            --- src/wp-templates/archive/<b>ContentNode.js</b> ---
        </pre>
        <pre>{JSON.stringify(pageContext, null, 4)}</pre>
        <h1>{data.wpContentNode.title}</h1>
        {data.allWpContentNode.nodes.map(node => (
            <div key={`${node.uri}+${node.title}`}>
                <Link to={node.uri}>{node.title}</Link>
            </div>
        ))}
        {!pageContext.isFirst && pageContext.previousPagePath ? (
            <Link to={pageContext.previousPagePath}>previous</Link>
        ) : null}
        {!pageContext.isLast && pageContext.nextPagePath ? (
            <Link to={pageContext.nextPagePath}>next</Link>
        ) : null}
    </>
)

export const query = graphql`
    query ArchiveContentNodeWithSingleContentNode(
        $archiveNodeIds: [String]!
        $sortOrder: [SortOrderEnum]!
        $sortFields: [WpContentNodeFieldsEnum]!
        $id: String
    ) {
        wpContentNode(id: { eq: $id }) {
            ... on WpNodeWithTitle {
                title
            }
        }
        allWpContentNode(
            filter: { id: { in: $archiveNodeIds } }
            sort: { order: $sortOrder, fields: $sortFields }
        ) {
            nodes {
                id
                uri
            }
        }
    }
`
