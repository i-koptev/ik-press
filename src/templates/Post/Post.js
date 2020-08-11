import React from "react"
import { Link } from "gatsby"
import LangSwitcher from "../../components/LangSwitcher"

const Post = ({ pageContext, data }) => {
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
        </>
    )
}

export default Post
