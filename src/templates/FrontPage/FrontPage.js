import React from "react"
import Layout from "../../components/Layout"

import LangSwitcher from "../../components/LangSwitcher"

const FrontPage = ({ pageContext, data }) => {
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
            {pageContext.lang === "en" ? <h3>English</h3> : null}
            {pageContext.lang === "lv" ? <h3>Latviesu</h3> : null}
            {pageContext.lang === "ru" ? <h3>Русский</h3> : null}
        </Layout>
    )
}

export default FrontPage
