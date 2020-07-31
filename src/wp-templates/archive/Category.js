import React from "react"
import { Link, graphql } from "gatsby"

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
