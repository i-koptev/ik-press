import React from "react"
import { graphql } from "gatsby"
// import BlogPost from "../../components/template-parts/blog-post"

export default ({ data }) => (
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
        <h1>{data.wpContentNode.title}</h1>
    </>
)

export const query = graphql`
    query ContentNode($id: String!) {
        wpContentNode(id: { eq: $id }) {
            ... on WpNodeWithTitle {
                title
            }
        }
    }
`
