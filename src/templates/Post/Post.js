import React from "react"
import { Link } from "gatsby"

const Post = ({ pageContext, data, location }) => {
    let l = location.pathname
    let prefixedWithLocale = l.match(/^\/ru/) || l.match(/^\/en/)
    const { languages, originalPath } = useI18next()

    return (
        <>
            <Link to={!prefixedWithLocale ? "/en" + l : l.replace("ru", "en")}>
                EN
            </Link>
            <br />
            <Link to={!prefixedWithLocale ? "/ru" + l : l.replace("en", "ru")}>
                RU
            </Link>
            <pre>{JSON.stringify(originalPath, null, 2)}</pre>

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
