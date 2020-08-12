import React from "react"
import Layout from "../../components/Layout"

import LangSwitcher from "../../components/LangSwitcher"

const Blog = ({ pageContext, data }) => {
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

export default Blog
