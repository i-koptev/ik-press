import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ pageContext, data }) => (
    <>
        <pre>
            --- src/wp-templates/archive/<b>Page.js</b> ---
        </pre>
        <pre>{JSON.stringify(pageContext, null, 4)}</pre>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        {data.allWpPage.nodes.map(node => (
            <div key={`${node.uri}+${node.title}`}>
                <Link to={node.uri}>{node.title}</Link>
            </div>
        ))}
        {!pageContext.isFirstArchivePage && pageContext.previousArchivePath ? (
            <Link to={pageContext.previousArchivePath}>previous</Link>
        ) : null}
        {!pageContext.isLastArchivePage && pageContext.nextArchivePath ? (
            <Link to={pageContext.nextArchivePath}>next</Link>
        ) : null}
    </>
)

export const query = graphql`
    query PageArchive(
        $archiveNodeIds: [String]!
        $sortOrder: [SortOrderEnum]!
        $sortFields: [WpPageFieldsEnum]!
    ) {
        allWpPage(
            filter: { id: { in: $archiveNodeIds } }
            sort: { order: $sortOrder, fields: $sortFields }
        ) {
            nodes {
                id
                uri
                title
            }
        }
    }
`
