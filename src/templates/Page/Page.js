import React from "react"
import { graphql, Link } from "gatsby"
import LangSwitcher from "../../components/LangSwitcher"

const Page = ({ pageContext, data }) => {
    return (
        <>
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
            <h1>{data.wpPage.title}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: data.wpPage.title,
                }}
            ></div>
        </>
    )
}

export default Page

export const postPageQuery = graphql`
    query pageByID($id: String!) {
        wpPage(id: { eq: $id }) {
            id
            title
            content
        }
    }
`
