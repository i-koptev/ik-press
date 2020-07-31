import React from "react"
import { graphql } from "gatsby"
// import BlogPost from "../../components/template-parts/blog-post"

export default ({ data }) => (
    <>
        <pre>
            --- src/wp-templates/single/<b>ContentNode.js</b> ---
        </pre>
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
