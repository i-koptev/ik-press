import React from "react"
import { Link, graphql } from "gatsby"

export default ({ pageContext, data }) => (
    <>
        <pre>
            --- src/wp-templates/single/<b>Category.js</b> ---
        </pre>
        <pre>{JSON.stringify(pageContext, null, 4)}</pre>
        {/* <h1>{data.wpPage.title}</h1> */}
    </>
)

// export const query = graphql`
//   query Page($id: String!) {
//     wpPage(id: { eq: $id }) {
//       title
//     }
//   }
// `
