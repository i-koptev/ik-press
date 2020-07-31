import React from "react"
import { Link, graphql } from "gatsby"
import Menu from "../../components/Menu/Menu"

export default ({ pageContext, data }) => (
    <>
        <pre>
            --- src/wp-templates/single/<b>Post.js</b> ---
        </pre>
        <pre>{JSON.stringify(pageContext, null, 4)}</pre>
        <Menu />
        <h1>{data.wpPost.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />
    </>
)

export const query = graphql`
    query Post($id: String!) {
        wpPost(id: { eq: $id }) {
            title
            content
        }
    }
`
/* export default ({ data }) => (
  <>
    <pre>
      --- src/wp-templates/single/<b>Post.js</b> ---
    </pre>
    <h1>{data.wpPost.title}</h1>
    <Link to={data.nextPost.uri}>Next Post</Link>
    <Link to={data.previousPost.uri}>Previous Post</Link>
  </>
)

export const query = graphql`
  query PostWithNextAndPrevious(
    $id: String!
    $nextSinglePageId: String
    $previousSinglePageId: String
  ) {
    wpPost(id: { eq: $id }) {
      title
    }

    # here we're renaming wpPost to nextPost so it doesn't conflict
    nextPost: wpPost(id: { eq: $nextSinglePageId }) {
      uri
    }

    # and this one gets renamed to previousPost
    previousPost: wpPost(id: { eq: $previousSinglePageId }) {
      uri
    }
  }
`
 */
