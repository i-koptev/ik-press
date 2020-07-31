import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ pageContext, data }) => (
    <>
        <div
            style={{
                fontSize: "10px",
                backgroundColor: "#345",
                color: "#eee",
                padding: "1rem",
            }}
        >
            <pre>
                <b>Template:</b> {__filename}
            </pre>
            <pre>
                <b>Page context:</b>
                <br />
                {JSON.stringify(pageContext, null, 2)}
            </pre>
            <pre>
                <b>Page data:</b>
                <br />
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
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
