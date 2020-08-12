import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"

import LangSwitcher from "../../components/LangSwitcher"

const Post = ({ pageContext, data }) => {
    return (
        <Layout>
            <LangSwitcher />

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
                    <b>Page location:</b>
                    <br />
                    {JSON.stringify(location, null, 2)}
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
        </Layout>
    )
}

export default Post

export const postById = graphql`
    query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
        thisPost: wpPost(id: { eq: $id }) {
            slug
            uri
            title
            content
        }
        nextPost: wpPost(id: { eq: $nextPostId }) {
            slug
            uri
            title
            content
        }
        previousPost: wpPost(id: { eq: $previousPostId }) {
            slug
            uri
            title
            content
        }
    }
`
